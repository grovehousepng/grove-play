import os
import csv
import re

# --- AYARLAR ---
# 1. Oyunların bulunduğu klasör
OYUN_KLASORU = r"C:\Users\yucel\OneDrive\Desktop\oyunsitesi\roms\oyunlar\roms"

# 2. Verilerin (Resim, Açıklama) olduğu ESKİ CSV dosyası
ESKI_CSV_YOLU = "oyun_listesi_final_v2.csv" 

# 3. Oluşturulacak YENİ CSV dosyası
YENI_CSV_DOSYASI = "oyun_listesi_FULL_MERGE.csv"

# İşlenecek uzantılar
UZANTILAR = ('.zip', '.iso', '.nes', '.sfc', '.md', '.bin', '.gba', '.exe')

def temiz_insan_basligi(dosya_adi):
    """
    CSV 'Title' sütunu için okunaklı başlık üretir.
    "super-mario-world (USA).zip" -> "Super Mario World"
    """
    isim = os.path.splitext(dosya_adi)[0]
    # Tire, alt tire ve noktaları BOŞLUK yap
    isim = isim.replace('-', ' ').replace('_', ' ').replace('.', ' ')
    # Parantez içlerini temizle
    isim = re.sub(r'\s*[\(\[].*?[\)\]]', '', isim)
    # Fazla boşlukları sil ve Baş Harfleri Büyüt
    return " ".join(isim.split()).title()

def dosya_url_slug(temiz_baslik):
    """
    Dosya adı ve URL için tireli format.
    "Super Mario World" -> "super-mario-world"
    """
    text = temiz_baslik.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text)
    return text.strip('-')

def iskelet_yap(metin):
    """
    Eşleştirme anahtarı. Sadece harf ve rakamları alır.
    "Super Mario Bros. 3" -> "supermariobros3"
    "super-mario-bros-3" -> "supermariobros3"
    Böylece yazım tarzı fark etmeksizin eşleşir.
    """
    return re.sub(r'[^a-z0-9]', '', metin.lower())

def main():
    if not os.path.exists(OYUN_KLASORU):
        print("HATA: Klasör bulunamadı!")
        return

    # --- 1. ADIM: Eski CSV'yi Hafızaya Al (Veri Deposu) ---
    print("Veritabanı (CSV) analiz ediliyor...")
    eski_veriler = {}
    
    if os.path.exists(ESKI_CSV_YOLU):
        with open(ESKI_CSV_YOLU, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # CSV'deki başlığın "iskeletini" çıkarıp anahtar yapıyoruz
                baslik = row.get("Title", "")
                iskelet = iskelet_yap(baslik)
                if iskelet:
                    eski_veriler[iskelet] = row
    else:
        print("UYARI: Eski CSV bulunamadı! Sadece boş liste oluşturulacak.")
    
    print(f"Hafızadaki Veri Sayısı: {len(eski_veriler)}")

    # --- 2. ADIM: Klasörü İşle ---
    print("Klasör taranıyor, dosyalar düzenleniyor ve eşleştiriliyor...")
    
    yeni_liste = []
    headers = ["Title", "GameURL", "ThumbnailURL", "Category", "Type", "Description"]
    
    dosyalar = [f for f in os.listdir(OYUN_KLASORU) if f.lower().endswith(UZANTILAR)]
    
    eslesen_sayisi = 0

    for eski_dosya_adi in dosyalar:
        # A. İsimleri Hazırla
        # 1. Başlık: "Super Mario World"
        baslik = temiz_insan_basligi(eski_dosya_adi)
        
        # 2. Slug: "super-mario-world"
        slug = dosya_url_slug(baslik)
        
        # 3. Uzantı: ".sfc"
        uzanti = os.path.splitext(eski_dosya_adi)[1]
        
        # 4. Yeni Dosya Adı ve URL
        yeni_dosya_adi = f"{slug}{uzanti}"
        game_url = f"/roms/{slug}.md"

        # B. FİZİKSEL DOSYA ADINI GÜNCELLE
        eski_yol = os.path.join(OYUN_KLASORU, eski_dosya_adi)
        yeni_yol = os.path.join(OYUN_KLASORU, yeni_dosya_adi)
        
        try:
            if eski_dosya_adi != yeni_dosya_adi:
                os.rename(eski_yol, yeni_yol)
        except OSError:
            pass # Hata olursa devam et

        # C. EŞLEŞTİRME (EN ÖNEMLİ KISIM)
        # Dosyanın iskeletini çıkar: "supermarioworld"
        dosya_iskeleti = iskelet_yap(baslik)
        
        # Veritabanında bu iskeleti ara
        veri = eski_veriler.get(dosya_iskeleti)
        
        thumb = ""
        cat = "Retro Game"
        desc = ""

        if veri:
            eslesen_sayisi += 1
            thumb = veri.get("ThumbnailURL", "")
            cat = veri.get("Category", "Retro Game")
            desc = veri.get("Description", "")
        
        # D. Listeye Ekle
        row_data = {
            "Title": baslik,        # Boşluklu, Güzel Başlık
            "GameURL": game_url,    # Tireli Link
            "ThumbnailURL": thumb,  # Varsa CSV'den geldi
            "Category": cat,        # Varsa CSV'den geldi
            "Type": "Emulator",     # Sabit
            "Description": desc     # Varsa CSV'den geldi
        }
        
        yeni_liste.append(row_data)

    # --- 3. ADIM: Kaydet ---
    try:
        with open(YENI_CSV_DOSYASI, mode='w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(yeni_liste)
        
        print("\n" + "="*40)
        print("BİRLEŞTİRME TAMAMLANDI!")
        print(f"Klasördeki Toplam Dosya: {len(dosyalar)}")
        print(f"CSV'den Bilgisi Çekilen: {eslesen_sayisi}")
        print(f"Yeni Dosya Yolu:         {os.path.abspath(YENI_CSV_DOSYASI)}")
        print("="*40)
        
    except PermissionError:
        print("HATA: CSV dosyası açık. Kapatıp tekrar dene.")

if __name__ == "__main__":
    main()