// Initialize Lucide Icon Pack
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});

// Sticky Header & Active Scroll State
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        // Toggle simple sliding drawer menu
        const isOpen = navLinks.style.display === 'flex';
        
        if (isOpen) {
            navLinks.style.opacity = '0';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(2, 12, 27, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
            navLinks.style.gap = '1.5rem';
            navLinks.style.opacity = '0';
            navLinks.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                navLinks.style.opacity = '1';
            }, 10);
            
            mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
        }
        
        if (window.lucide) {
            lucide.createIcons();
        }
    });

    // Close mobile menu on clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
                if (window.lucide) lucide.createIcons();
            }
        });
    });
}

// Services Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active state from other tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active state to current tab
        btn.classList.add('active');
        const targetPanel = document.getElementById(btn.getAttribute('data-tab'));
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Interactive Keşif & Hijyen Calculator
const areaSlider = document.getElementById('calc-range');
const areaValueText = document.getElementById('calc-area-val');
const calcPills = document.querySelectorAll('.calc-pill');

const resPrice = document.getElementById('res-price');
const resTime = document.getElementById('res-time');
const resScore = document.getElementById('res-score');
const calcCtaBtn = document.getElementById('calc-cta-btn');

let currentFactor = 1.0;
let currentServiceName = 'Ev & Rezidans Temizliği';

function updateCalculator() {
    if (!areaSlider) return;
    
    const area = parseInt(areaSlider.value);
    areaValueText.textContent = `${area} m²`;
    
    // 1. Calculate Recommended Specialists (Team size) internally for duration
    let teamSize = 2;
    if (area <= 120) {
        teamSize = 2;
    } else if (area <= 250) {
        teamSize = 3;
    } else if (area <= 450) {
        teamSize = 4;
    } else if (area <= 750) {
        teamSize = 6;
    } else {
        teamSize = 8;
    }
    
    // 2. Calculate Estimated Price (Tahmini Ücret)
    // Formula: Area * 15 TL * Factor + 800 base mobilization, rounded to nearest 50 TL
    let price = Math.round((area * 15 * currentFactor + 800) / 50) * 50;
    let formattedPrice = price.toLocaleString('tr-TR');
    
    // 3. Calculate Estimated Duration (Hours)
    let hours = (area * currentFactor * 0.08) / teamSize;
    hours = Math.max(3, Math.round(hours * 2) / 2); // Minimum 3 hours, rounded to nearest 0.5
    
    // Update DOM
    if (resPrice) resPrice.innerHTML = `<span>${formattedPrice}</span> ₺`;
    if (resTime) resTime.innerHTML = `<span>${hours.toFixed(1)}</span> Saat`;
    if (resScore) resScore.innerHTML = `<span>100%</span>`;
}

// Slider event listener
if (areaSlider) {
    areaSlider.addEventListener('input', updateCalculator);
}

// Service selection pills event listeners
calcPills.forEach(pill => {
    pill.addEventListener('click', () => {
        calcPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        
        currentFactor = parseFloat(pill.getAttribute('data-factor'));
        currentServiceName = pill.getAttribute('data-service');
        
        updateCalculator();
    });
});

// Calculator CTA click logic (Auto-fill booking form)
if (calcCtaBtn) {
    calcCtaBtn.addEventListener('click', (e) => {
        const area = areaSlider ? areaSlider.value : '';
        
        // Auto fill form inputs
        const formServiceSelect = document.getElementById('form-service');
        const formAreaInput = document.getElementById('form-area');
        const formMsgTextarea = document.getElementById('form-msg');
        
        if (formAreaInput) formAreaInput.value = area;
        
        if (formServiceSelect) {
            // Find option matches the current category
            for (let option of formServiceSelect.options) {
                if (option.value.toLowerCase().includes(currentServiceName.toLowerCase()) || 
                    currentServiceName.toLowerCase().includes(option.value.toLowerCase())) {
                    formServiceSelect.value = option.value;
                    break;
                }
            }
            // If no exact match, set a general value based on factors
            if (!formServiceSelect.value) {
                if (currentFactor === 1.5) {
                    formServiceSelect.value = 'İnşaat / Tadilat Sonrası Temizlik';
                } else if (currentFactor === 1.2) {
                    formServiceSelect.value = 'Premium Villa ve Malikane';
                } else if (currentFactor === 0.9) {
                    formServiceSelect.value = 'Ofis ve Plaza Temizliği';
                } else {
                    formServiceSelect.value = 'VIP Ev ve Rezidans Temizliği';
                }
            }
        }
        
        if (formMsgTextarea) {
            const priceVal = resPrice ? resPrice.querySelector('span').textContent : '';
            formMsgTextarea.value = `Keşif Hesaplayıcı ile analiz yapıldı: ${area} m² alan için tahmini ${priceVal} ₺ bütçe ile 7/24 VIP temizlik teklifi talep ediliyor.`;
        }
    });
}

// Initialize calculator on page load
updateCalculator();

// Intersection Observer for scroll reveal animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Stop observing after reveal animation finishes
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
});

// Premium Form Submission handling with animations
const teklifForm = document.getElementById('teklif-form');
const submitBtn = document.getElementById('form-submit-btn');

if (teklifForm && submitBtn) {
    teklifForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'İşleniyor <i data-lucide="loader" class="animate-spin"></i>';
        submitBtn.disabled = true;
        
        // Add rotation animation style for loader icon dynamically
        const style = document.createElement('style');
        style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } } .animate-spin { animation: spin 1s linear infinite; }`;
        document.head.appendChild(style);
        if (window.lucide) lucide.createIcons();

        // Simulate secure premium submission
        setTimeout(() => {
            // Success State UI
            submitBtn.style.background = '#25D366';
            submitBtn.style.color = '#FFFFFF';
            submitBtn.innerHTML = 'Talebiniz Başarıyla Alındı <i data-lucide="check-circle-2"></i>';
            if (window.lucide) lucide.createIcons();
            
            // Show alert modal
            setTimeout(() => {
                alert(`Sayın ${document.getElementById('form-name').value}, online teklif ve keşif talebiniz Rabiye Ünver güvencesiyle başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.`);
                
                // Reset form
                teklifForm.reset();
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                if (window.lucide) lucide.createIcons();
            }, 300);

        }, 1800);
    });
}
