(function() {
  'use strict';

  // GTM dataLayer init
  window.dataLayer = window.dataLayer || [];

  const spData = window.spasibaData || {};

  // ─── YARDIMCI FONKSİYONLAR ───────────────────────────────────

  function push(eventName, ecommerceData) {
    dataLayer.push({ ecommerce: null });
    const payload = {
      event: eventName,
      ecommerce: ecommerceData
    };
    if (spData.customer) {
      const c = spData.customer;
      const addr = c.address || {};
      payload.user_data = {
        email: c.email || undefined,
        phone: c.phone || undefined,
        first_name: c.first_name || undefined,
        last_name: c.last_name || undefined,
        city: addr.city || undefined,
        region: addr.region || undefined,
        zip: addr.zip || undefined,
        country: addr.country || undefined
      };
    }
    dataLayer.push(payload);
  }

  function toPrice(cents) {
    return (cents || 0) / 100;
  }

  function productToItem(p, index) {
    return {
      item_id: String(p.id || p.product_id || ''),
      item_name: p.title || '',
      item_brand: p.vendor || '',
      item_category: p.type || '',
      item_variant: p.variant_title || '',
      price: toPrice(p.price),
      quantity: p.quantity || 1,
      index: index || 0
    };
  }

  // ─── SAYFA TİPİNE GÖRE OTOMATIK EVENT'LER ────────────────────

  const pageType = spData.page && spData.page.type;

  // view_item_stape — ürün sayfası
  if (pageType === 'product' && spData.product) {
    const p = spData.product;
    push('view_item_stape', {
      currency: 'TRY',
      value: toPrice(p.price),
      items: [{
        item_id: String(p.id),
        item_name: p.title,
        item_brand: p.vendor,
        item_category: p.type,
        item_variant: p.variant_title,
        price: toPrice(p.price),
        quantity: 1
      }]
    });
  }

  // view_collection_stape — koleksiyon sayfası
  if (pageType === 'collection' && spData.collection) {
    push('view_collection_stape', {
      currency: 'TRY',
      item_list_name: spData.collection.title,
      items: (spData.collection.products || []).map(function(p, i) {
        return {
          item_id: String(p.id),
          item_name: p.title,
          item_brand: p.vendor,
          item_category: p.type,
          price: toPrice(p.price),
          index: i
        };
      })
    });
  }

  // view_cart_stape — sepet sayfası
  if (pageType === 'cart' && spData.cart) {
    const cart = spData.cart;
    push('view_cart_stape', {
      currency: 'TRY',
      value: toPrice(cart.total_price),
      items: (cart.items || []).map(function(item, i) {
        return productToItem(item, i);
      })
    });
  }

  // search_submitted_stape — arama sonuç sayfası
  if (pageType === 'search') {
    const params = new URLSearchParams(window.location.search);
    const term = params.get('q') || '';
    if (term) {
      push('search_submitted_stape', {
        search_term: term
      });
    }
  }

  // ─── ADD TO CART — SHRINE EVENTS ─────────────────────────────

  let lastCartAddTime = 0;
  const shrineAtcEvents = ['cart:add', 'shrine:cart:updated', 'on:cart:add'];
  
  function handleAddToCart(e) {
    const now = Date.now();
    if (now - lastCartAddTime < 500) return; // Mükerrer tetiklemeyi önle
    
    // 'shrine:cart:updated' eventi hem ekleme hem silmede çalışabilir, 
    // bu yüzden ekleme (add) olduğunu doğrulamaya çalışıyoruz.
    if (e.type === 'shrine:cart:updated' && e.detail && e.detail.action && e.detail.action !== 'add') return;
    
    const item = e.detail && (e.detail.product || e.detail.item || (e.detail.items && e.detail.items[0]));
    if (item) {
      lastCartAddTime = now;
      push('add_to_cart_stape', {
        currency: 'TRY',
        value: toPrice(item.price) * (item.quantity || 1),
        items: [{
          item_id: String(item.id || item.product_id || ''),
          item_name: item.title || item.product_title || '',
          item_brand: item.vendor || '',
          item_variant: item.variant_title || '',
          price: toPrice(item.price),
          quantity: item.quantity || 1
        }]
      });
    }
  }

  shrineAtcEvents.forEach(function(evtName) {
    document.addEventListener(evtName, handleAddToCart);
  });

  // Form submit fallback
  document.addEventListener('submit', function(e) {
    const form = e.target;
    if (!form || !form.getAttribute('action') || form.getAttribute('action').indexOf('/cart/add') === -1) return;
    
    const now = Date.now();
    if (now - lastCartAddTime < 500) return;

    const variantInput = form.querySelector('[name="id"]');
    const qtyInput = form.querySelector('[name="quantity"]');
    if (!variantInput) return;

    const variantId = variantInput.value;
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;

    if (spData.product && String(spData.product.id) === String(variantId)) {
      lastCartAddTime = now;
      const p = spData.product;
      push('add_to_cart_stape', {
        currency: 'TRY',
        value: toPrice(p.price) * qty,
        items: [productToItem(p)]
      });
    }
  });

  // ─── VIEW CART — DRAWER OPENING (MutationObserver) ───────────

  const drawerSelector = 'cart-drawer';
  const drawerElement = document.querySelector(drawerSelector);
  let drawerFetchInProgress = false;
  
  if (drawerElement) {
    let drawerOpenTimer;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isActive = drawerElement.classList.contains('active');
          if (isActive && pageType !== 'cart' && !drawerFetchInProgress) {
            clearTimeout(drawerOpenTimer);
            drawerOpenTimer = setTimeout(function() {
              drawerFetchInProgress = true;
              fetch('/cart.js')
                .then(function(res) { return res.json(); })
                .then(function(cart) {
                  push('view_cart_stape', {
                    currency: 'TRY',
                    value: toPrice(cart.total_price),
                    items: (cart.items || []).map(function(item, i) {
                      return productToItem(item, i);
                    })
                  });
                })
                .catch(function() {})
                .finally(function() {
                   // Drawer kapandığında veya işlem bittiğinde flag'i sıfırla 
                   // (Tekrar açıldığında çalışması için)
                   setTimeout(function() { drawerFetchInProgress = false; }, 1000);
                });
            }, 200);
          }
        }
      });
    });
    
    observer.observe(drawerElement, { attributes: true });
  }

  // ─── REMOVE FROM CART ───────────────────────────────────────
  
  document.addEventListener('click', function(e) {
    const removeBtn = e.target.closest('a[href*="/cart/change"], .cart-remove, .js-remove-from-cart, cart-remove-button');
    if (!removeBtn) return;
    
    // Eğer cart-remove-button ise (Shrine drawer), içindeki data'ları almaya çalış
    let variantId = '';
    if (removeBtn.tagName === 'CART-REMOVE-BUTTON') {
       // Shrine genellikle data-index veya data-id kullanır
       const index = removeBtn.getAttribute('data-index');
       // Sepet verisinden index'e göre ürünü bul (1-based index)
       if (index && spData.cart && spData.cart.items) {
          const item = spData.cart.items[parseInt(index) - 1];
          if (item) {
             push('remove_from_cart_stape', {
               currency: 'TRY',
               value: toPrice(item.price) * item.quantity,
               items: [productToItem(item)]
             });
          }
          return;
       }
    }

    const url = new URL(removeBtn.href || window.location.href, window.location.origin);
    const id = url.searchParams.get('id') || url.searchParams.get('line');
    
    if (id && spData.cart && spData.cart.items) {
        const item = spData.cart.items.find(function(i) { 
          return String(i.variant_id) === id || String(i.product_id) === id; 
        });
        if (item) {
            push('remove_from_cart_stape', {
                currency: 'TRY',
                value: toPrice(item.price) * item.quantity,
                items: [productToItem(item)]
            });
        }
    }
  });

  // ─── VARIANT CHANGE ─────────────────────────────────────────
  
  function handleVariantChange(variantId) {
    if (pageType !== 'product' || !spData.product) return;
    const p = spData.product;
    
    push('view_item_stape', {
      currency: 'TRY',
      value: toPrice(p.price),
      items: [{
        item_id: String(p.id),
        item_name: p.title,
        item_brand: p.vendor,
        item_category: p.type,
        item_variant: String(variantId),
        price: toPrice(p.price),
        quantity: 1
      }]
    });
  }

  // Shrine 'variant:changed' eventini de dinleyelim
  document.addEventListener('variant:changed', function(e) {
    const variant = e.detail && e.detail.variant;
    if (variant) {
      handleVariantChange(variant.id);
    }
  });

  document.addEventListener('change', function(e) {
    if (e.target.name === 'id' || e.target.classList.contains('variant-select')) {
       handleVariantChange(e.target.value);
    }
  });

})();
