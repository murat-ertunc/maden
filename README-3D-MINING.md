# 3D Maden Yönetimi Sistemi

Bu proje, Laravel 11 ve Three.js kullanarak geliştirilmiş kapsamlı bir 3D maden görselleştirme ve yönetim sistemidir.

## 🚀 Özellikler

### ✨ Ana Özellikler
- **3D Maden Modelleme**: Gerçekçi 3D maden görselleştirme
- **Katman Yönetimi**: Farklı jeolojik katmanları oluşturma ve düzenleme
- **Model Yönetimi**: Ekipman, bina, tünel, kuyu gibi 3D modeller
- **İnteraktif Kontroller**: Zoom, pan, orbit kontrollerle 3D sahne gezintisi
- **Gerçek Zamanlı Düzenleme**: Canlı 3D düzenleme araçları
- **Görsel Control Panel**: Dat.GUI ile profesyonel kontrol paneli

### 🎯 3D Modelleme Özellikleri
- **Açık Ocak Madenleri**: Basamaklı kazı geometrileri
- **Tünel Sistemleri**: Silindirik ve özel tünel modelleri
- **Kuyu Şaftları**: Derin kuyu yapıları
- **Ekipman Modelleri**: Ekskavatör, kamyon gibi madencilik ekipmanları
- **Jeolojik Katmanlar**: Farklı mineral türleri için özelleştirilmiş görselleştirme

### 🔧 Teknik Özellikler
- **Three.js Integration**: Modern WebGL tabanlı 3D grafik
- **Responsive Design**: Masaüstü ve mobil uyumlu
- **Real-time Updates**: API üzerinden gerçek zamanlı güncelleme
- **Export/Import**: 3D sahne verilerini dışa/içe aktarma
- **Material System**: Gerçekçi PBR materyalleri
- **Lighting System**: Dinamik ışıklandırma sistemi

## 📋 Sistem Gereksinimleri

- PHP 8.2+
- MySQL 5.7+ / PostgreSQL 13+
- Node.js 18+
- Composer 2.0+
- Modern web tarayıcısı (WebGL desteği gerekli)

## 🛠️ Kurulum

### 1. Proje Klonlama
```bash
git clone <repository-url>
cd maden-project
```

### 2. PHP Bağımlılıkları
```bash
composer install
```

### 3. JavaScript Bağımlılıkları
```bash
npm install
```

### 4. Ortam Ayarları
```bash
cp .env.example .env
php artisan key:generate
```

### 5. Veritabanı Ayarları
`.env` dosyasında veritabanı ayarlarını düzenleyin:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=maden
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 6. Migration'ları Çalıştırın
```bash
php artisan migrate
```

### 7. Frontend Build
```bash
npm run build
```

### 8. Sunucuyu Başlatın
```bash
php artisan serve
```

## 📖 Kullanım Kılavuzu

### Yeni Maden Oluşturma
1. Ana sayfadan "Yeni Maden Oluştur" butonuna tıklayın
2. Maden bilgilerini doldurun (ad, açıklama, konum, koordinatlar)
3. Durumu seçin (Planlama/Aktif/Pasif/Tamamlandı)
4. "Maden Oluştur" butonuna tıklayın

### 3D Görünümde Çalışma
1. Maden listesinden bir madeni seçin
2. "3D Görünüm" butonuna tıklayın
3. Control panel (sağ üst) ile sahneyi kontrol edin
4. Hızlı işlemler paneli (sol üst) ile katman/model ekleyin

### Katman Ekleme
1. Control panel'den "Katman Ayarları" bölümünü açın
2. Şablon seçin (Kömür, Demir, Bakır, Altın, vb.)
3. "Katman Ekle" butonuna tıklayın
4. Özelliklerini düzenleyin (derinlik, renk, yoğunluk)

### Model Ekleme
1. Control panel'den "Model Ayarları" bölümünü açın
2. Model tipini seçin (Açık Ocak, Tünel, Kuyu, Ekipman)
3. "Model Ekle" butonuna tıklayın
4. Pozisyon, rotasyon ve ölçeği ayarlayın

## 🎮 Kontroller

### Kamera Kontrolları
- **Sol Tık + Sürükle**: Kamerayı döndür
- **Sağ Tık + Sürükle**: Kamerayı kaydır
- **Mouse Tekerlek**: Yakınlaştır/Uzaklaştır
- **Ctrl + Scroll**: Hızlı zoom

### Obje Seçimi
- **Sol Tık**: Obje seç/seçimi kaldır
- **Hover**: Obje üzerine gelme efekti

### Control Panel
- **Sahne Ayarları**: Gölge, grid, eksen görünürlüğü
- **Katman Ayarları**: Saydamlık, wireframe, kesit görünümü
- **Model Ayarları**: Model görünürlük kontrolleri
- **Araçlar**: Kamera sıfırlama, dışa aktarma

## 🗂️ Proje Yapısı

```
├── app/
│   ├── Http/Controllers/
│   │   ├── MineController.php          # Web interface controller
│   │   └── Api/MineApiController.php   # 3D API controller
│   ├── Models/
│   │   ├── Mine.php                    # Ana maden modeli
│   │   ├── MineModel.php               # 3D model verisi
│   │   └── MineLayer.php               # Jeolojik katman verisi
│   └── Policies/
│       └── MinePolicy.php              # Yetkilendirme kuralları
├── database/migrations/
│   ├── create_mines_table.php          # Ana maden tablosu
│   ├── create_mine_models_table.php    # 3D model tablosu
│   └── create_mine_layers_table.php    # Katman tablosu
├── resources/
│   ├── js/mine3d/
│   │   ├── Mine3DSystem.js             # Ana 3D sistem
│   │   ├── components/
│   │   │   ├── MineScene.js            # 3D sahne yönetimi
│   │   │   ├── MineModelManager.js     # Model yöneticisi
│   │   │   ├── MineLayerManager.js     # Katman yöneticisi
│   │   │   └── MineControlPanel.js     # Kontrol paneli
│   │   └── utils/
│   │       └── api.js                  # API yardımcı fonksiyonları
│   └── views/mines/
│       ├── index.blade.php             # Maden listesi
│       ├── create.blade.php            # Maden oluşturma
│       ├── show.blade.php              # 3D görünüm sayfası
│       └── edit.blade.php              # Maden düzenleme
└── routes/
    └── web.php                         # Web ve API rotaları
```

## 🎨 3D Model Türleri

### Jeolojik Katmanlar
- **Kömür Katmanı**: Düzensiz yüzey, düşük metallik
- **Demir Cevheri**: Katmanlı yapı, yüksek metallik
- **Bakır Cevheri**: Damar desenli, orta metallik
- **Altın Cevheri**: Nugget benzeri, maksimum metallik
- **Kireçtaşı**: Düz yüzey, metallik yok
- **Kumtaşı**: Dokulu yüzey, metallik yok

### Maden Modelleri
- **Açık Ocak**: Basamaklı kazı geometrisi
- **Tünel**: Silindirik geçiş yapısı
- **Kuyu**: Dikey şaft yapısı
- **Bina**: Çatılı yapı geometrisi

### Ekipman Modelleri
- **Ekskavatör**: Articulared boom sistemi
- **Kamyon**: Kabin + kasa geometrisi
- **Özel Ekipman**: Kutu geometri (genişletilebilir)

## 🔌 API Endpoints

### Sahne Verisi
```
GET /api/mines/{mine}/scene-data
```

### Model İşlemleri
```
POST   /api/mines/{mine}/models          # Model ekleme
PUT    /api/mines/{mine}/models/{model}  # Model güncelleme
DELETE /api/mines/{mine}/models/{model}  # Model silme
```

### Katman İşlemleri
```
POST   /api/mines/{mine}/layers          # Katman ekleme
PUT    /api/mines/{mine}/layers/{layer}  # Katman güncelleme
DELETE /api/mines/{mine}/layers/{layer}  # Katman silme
```

### Konfigürasyon
```
PUT /api/mines/{mine}/configuration      # Sahne ayarları güncelleme
```

## 🔒 Güvenlik

- **Yetkilendirme**: Her maden sadece sahibi tarafından erişilebilir
- **CSRF Koruması**: Tüm form işlemlerinde CSRF token
- **Veri Doğrulama**: Kapsamlı input validasyonu
- **SQL Injection**: Eloquent ORM kullanımı

## 🌟 Gelecek Özellikler

- [ ] Gerçek zamanlı işbirliği (real-time collaboration)
- [ ] VR/AR desteği
- [ ] Gelişmiş jeolojik simulasyonlar
- [ ] Machine learning tahminleri
- [ ] Drone fotogrametri entegrasyonu
- [ ] Harita/GIS entegrasyonu
- [ ] PDF/CAD dışa aktarım
- [ ] Mobil uygulama

## 🤝 Katkıda Bulunma

1. Repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 Destek

- **Email**: support@example.com
- **Documentation**: [Wiki sayfası]
- **Issues**: GitHub Issues bölümü

---

**Not**: Bu sistem modern tarayıcılarda WebGL desteği gerektirir. En iyi performans için Chrome/Firefox önerilir.
