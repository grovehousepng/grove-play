# Grove Media Creative - SEO & GEO Strategy Audit

## 1. MİMARİ VE TEKNİK ALTYAPI (GEO ODAKLI)
- **Semantic Component Hierarchy:** Mevcut `/hizmet/[slug]` sayfalarında `article > section > aside` yapısı kurulu. AI botları için bu hiyerarşi yeterince "temiz" mi? Vektörel veri tabanlarına kayıt edilirken (RAG sistemleri) bağlam kaybı yaşanıyor mu?
- **JSON-LD @graph Optimization:** `layout.js` içindeki `@graph` yapısı `Organization`, `WebSite`, `ProfessionalService` ve `Person` (Yücel Güzel) varlıklarını birbirine bağlıyor. Bu varlıklar arasındaki "ilişki derinliği" (relation depth) LLM'lerin bizi otorite olarak görmesi için yeterli mi?
- **Programmatic Regional Routing:** `/hizmet/[slug]/[city]` yapısı kuruldu. Türkiye'nin 81 ili ve 900+ ilçesi için bu yapıyı build-time'ı şişirmeden (ISR - Incremental Static Regeneration) nasıl daha efektif ölçekleyebiliriz?

## 2. LLM CRAWLER VE INDEXING STRATEJİSİ
- **Robots.txt & Sitemap:** GPTBot, ClaudeBot ve PerplexityBot için özel izinler verildi. LLM'lerin siteyi "eğitim verisi" olarak mı yoksa "gerçek zamanlı kaynak" olarak mı taramasını tercih etmeliyiz? Tarama bütçesini (crawl budget) sadece yüksek otoriteli hizmet sayfalarına nasıl odaklayabiliriz?
- **Canonical & Double URL Management:** Trailing slash ve canonical etiketleri çözüldü. Ancak AI arama motorları bazen URL parametrelerini yanlış yorumlayabiliyor. Bu riski minimize edecek bir `middleware` katmanı gerekli mi?

## 3. ENTITY (VARLIK) OTORİTESİ VE TRUST SIGNALS
- **Structural Evidence:** Sayfalara eklenen "Dönüşüm Artışı", "PageSpeed" gibi metrikler `data-attributes` ile sunuluyor. AI modellerinin bu verilerin "doğruluğuna" güvenmesi için (hallucination önleme) dış kaynaklı kanıtları (örneğin schema içinden external linkler) nasıl entegre edebiliriz?
- **Expertise Mapping:** Kurucu ve ajans uzmanlıkları `knowsAbout` ile tanımlandı. Bu uzmanlıkların Wikipedia, LinkedIn veya GitHub gibi harici "Entity"ler ile `sameAs` üzerinden bağlanması GEO performansını ne kadar etkiler?

## 4. CONTENT STRATEGY (BLOGSUZ OTORİTE)
- **Landing Page Depth:** Blog yapısı olmadığı için otoriteyi sadece landing page'ler üzerinden kurmalıyız. Her bir hizmet sayfasının "bilgi derinliğini" (Information Depth) AI'ların bizi "Topic Expert" olarak işaretleyeceği seviyeye nasıl getirebiliriz?
- **FAQPage JSON-LD vs. UI:** FAQ'lar hem UI'da akordeon olarak hem de schema'da var. AI Overviews (SGE) için bu FAQ'ların "Unique" (benzersiz) ve "Direct Answer" (doğrudan cevap) formatında olması için optimize edilmeli mi?

## 5. GELECEK VİZYONU (AI-SEARCH RANKING)
- **Perplexity & SearchGPT Optimization:** Bu motorların bizi referans göstermesi için site içindeki "Citation" (atıf) verilebilir metinlerin formatı nasıl olmalı?
- **Voice Search Integration:** GEO stratejimizin sesli aramalar (Siri, Alexa, Google Assistant) üzerindeki etkisi ne olacak?

---
**LLM ANALİZ TALİMATI:**
Yukarıdaki teknik detayları inceleyerek Grove Media Creative'in SEO ve GEO stratejisini "Dünya Sınıfı" bir otorite seviyesine taşıyacak, uygulanabilir 3 kritik teknik tavsiye verin. Blog kullanmadan otorite inşası konusuna odaklanın.
