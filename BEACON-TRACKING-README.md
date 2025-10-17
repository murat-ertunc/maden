# 📡 Beacon Tracking System - Kullanım Kılavuzu

## Genel Bakış

Bu sistem, gateway cihazlarından gelen beacon okuma verilerini toplar, saklar ve analiz eder. Gerçek zamanlı konum takibi için RSSI (Received Signal Strength Indicator) verilerini kullanır.

## 📋 API Endpoints

### 1. Beacon Verisi Kaydetme
**Endpoint:** `POST /api/gateway-data`

#### Tekli Okuma Formatı:
```json
{
  "beacon_id": "A4:C1:38:00:00:11",
  "gateway_id": "GW01",
  "rssi": -69,
  "timestamp": "2025-10-08T12:00:00Z",
  "mine_id": 27
}
```

#### Çoklu Okuma Formatı (Batch):
```json
{
  "mine_id": 27,
  "readings": [
    {
      "beacon_id": "A4:C1:38:00:00:11",
      "gateway_id": "GW01",
      "rssi": -69,
      "timestamp": "2025-10-08T12:00:00Z"
    },
    {
      "beacon_id": "A4:C1:38:00:00:12",
      "gateway_id": "GW02",
      "rssi": -75,
      "timestamp": "2025-10-08T12:00:05Z"
    }
  ]
}
```

#### Alternatif Format Desteği:
Sistem aşağıdaki alan adlarını da destekler:
- `beacon_id` veya `beaconId` veya `beacon`
- `gateway_id` veya `gatewayId` veya `gateway`
- `rssi` veya `signal_strength`
- `timestamp` veya `reading_timestamp`
- `mine_id` veya `mineId`

#### Yanıt:
```json
{
  "success": true,
  "message": "Successfully saved 2 beacon reading(s)",
  "saved_count": 2,
  "timestamp": "2025-10-08T12:00:10.000000Z"
}
```

---

### 2. Son Beacon Okumalarını Getirme
**Endpoint:** `GET /api/beacons/latest`

#### Query Parametreleri:
- `mine_id` (integer, optional): Belirli bir maden için filtreleme
- `minutes` (integer, optional, default=10): Kaç dakikalık geçmiş
- `use_mock` (boolean, optional, default=false): Veri yoksa mock data kullan (sadece local env)

#### Örnek İstek:
```
GET /api/beacons/latest?mine_id=27&minutes=10
```

#### Yanıt:
```json
{
  "data": [
    {
      "beacon_id": "A4:C1:38:00:00:11",
      "gateway_id": "GW01",
      "rssi": -69,
      "timestamp": "2025-10-08T12:00:00.000000Z"
    }
  ],
  "gateways": {
    "GW01": {
      "x": 10.5,
      "y": 20.3,
      "segment_key": "segment_1",
      "path_id": 123
    }
  },
  "meta": {
    "mine_id": 27,
    "generated_at": "2025-10-08T12:00:10.000000Z",
    "source": "database",
    "time_range_minutes": 10,
    "reading_count": 45,
    "active_beacons": 5,
    "active_gateways": 8
  }
}
```

---

## 🗄️ Veritabanı Yapısı

### beacon_readings Tablosu

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| id | bigint | Primary key |
| mine_id | bigint (nullable) | İlgili maden ID'si |
| beacon_id | varchar(50) | Beacon cihaz ID'si |
| gateway_id | varchar(50) | Gateway cihaz ID'si |
| rssi | integer | Sinyal gücü (dBm cinsinden) |
| reading_timestamp | timestamp | Okuma zamanı |
| ip_address | varchar(45) | Gateway IP adresi |
| raw_data | text (json) | Ham veri (debugging için) |
| created_at | timestamp | Kayıt oluşturma zamanı |
| updated_at | timestamp | Kayıt güncelleme zamanı |

### İndeksler:
- `beacon_id` - Hızlı beacon araması
- `gateway_id` - Hızlı gateway araması
- `reading_timestamp` - Zaman bazlı sorgular
- `(beacon_id, reading_timestamp)` - Beacon geçmişi
- `(gateway_id, reading_timestamp)` - Gateway geçmişi
- `(mine_id, reading_timestamp)` - Maden bazlı sorgular

---

## 🔧 Model Kullanımı

### BeaconReading Model

```php
use App\Models\BeaconReading;

// Son 10 dakikalık tüm okumalar
$readings = BeaconReading::latestForMine($mineId, 10);

// Belirli bir beacon'ın son okumaları
$beaconReadings = BeaconReading::latestForBeacon('A4:C1:38:00:00:11', 20);

// Belirli bir gateway'in son okumaları
$gatewayReadings = BeaconReading::latestForGateway('GW01', 15);

// Aktif beacon'ları listele
$activeBeacons = BeaconReading::activeBeacons(10); // Son 10 dakika

// Aktif gateway'leri listele
$activeGateways = BeaconReading::activeGateways(10);

// Eski kayıtları temizle (7 günden eski)
BeaconReading::cleanOldReadings(7);
```

### Mine Model ile İlişki

```php
use App\Models\Mine;

$mine = Mine::find(27);

// Mine'ın tüm beacon readings'leri
$allReadings = $mine->beaconReadings;

// Son 10 dakikalık okumalar
$latestReadings = $mine->latestBeaconReadings(10);
```

---

## 🧪 Test Araçları

### 1. Beacon Tester (Web Arayüzü)
**URL:** `http://localhost:8000/beacon-tester.html`

Bu arayüz üzerinden:
- ✅ Tekli beacon verisi gönderme
- ✅ Çoklu beacon verisi gönderme (batch)
- ✅ Özel JSON formatı test etme
- ✅ Kayıtlı verileri görüntüleme
- ✅ Otomatik simülasyon (sürekli veri gönderme)

### 2. Request Monitor
**URL:** `http://localhost:8000/request-monitor.html`

Tüm HTTP isteklerini canlı olarak izleyin.

---

## 📊 Kullanım Senaryoları

### Senaryo 1: Raspberry Pi Gateway Entegrasyonu

```python
# Python - Raspberry Pi
import requests
import time

GATEWAY_ID = "GW01"
API_URL = "http://your-server.com/api/gateway-data"

def send_beacon_reading(beacon_id, rssi):
    data = {
        "beacon_id": beacon_id,
        "gateway_id": GATEWAY_ID,
        "rssi": rssi,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "mine_id": 27
    }
    
    response = requests.post(API_URL, json=data)
    return response.json()

# Sürekli tarama
while True:
    # Beacon taraması yap
    beacons = scan_bluetooth_beacons()
    
    for beacon in beacons:
        result = send_beacon_reading(beacon.id, beacon.rssi)
        print(f"Sent: {result}")
    
    time.sleep(3)  # 3 saniye bekle
```

### Senaryo 2: Batch Gönderimi

```javascript
// JavaScript - Node.js Gateway
const axios = require('axios');

const readings = [];

// Her beacon okumasını buffer'a ekle
function bufferReading(beaconId, gatewayId, rssi) {
    readings.push({
        beacon_id: beaconId,
        gateway_id: gatewayId,
        rssi: rssi,
        timestamp: new Date().toISOString()
    });
}

// Her 5 saniyede bir toplu gönder
setInterval(async () => {
    if (readings.length > 0) {
        try {
            const response = await axios.post('http://your-server.com/api/gateway-data', {
                mine_id: 27,
                readings: [...readings]
            });
            console.log(`Sent ${readings.length} readings:`, response.data);
            readings.length = 0; // Buffer'ı temizle
        } catch (error) {
            console.error('Error sending batch:', error.message);
        }
    }
}, 5000);
```

### Senaryo 3: Frontend Entegrasyonu

```javascript
// Vue.js / React
async function fetchLatestBeacons(mineId) {
    try {
        const response = await fetch(`/api/beacons/latest?mine_id=${mineId}&minutes=5`);
        const data = await response.json();
        
        console.log(`Source: ${data.meta.source}`);
        console.log(`Active Beacons: ${data.meta.active_beacons}`);
        console.log(`Active Gateways: ${data.meta.active_gateways}`);
        
        // Her beacon için pozisyon hesapla
        data.data.forEach(reading => {
            const position = calculatePosition(
                reading.beacon_id,
                reading.gateway_id,
                reading.rssi,
                data.gateways
            );
            console.log(`Beacon ${reading.beacon_id} at`, position);
        });
        
    } catch (error) {
        console.error('Error fetching beacons:', error);
    }
}

// Her 5 saniyede bir güncelle
setInterval(() => fetchLatestBeacons(27), 5000);
```

---

## 🔒 Güvenlik

1. **Authentication**: API endpoint'leri authentication gerektirmez (IoT cihazlar için). Production'da API key veya token kullanılmalı.

2. **Rate Limiting**: Çok fazla istek göndermeyi önlemek için rate limiting eklenebilir:
```php
// routes/api.php
Route::middleware('throttle:60,1')->group(function () {
    Route::any('/gateway-data', [GatewayController::class, 'storeGatewayData']);
});
```

3. **IP Whitelisting**: Sadece belirli IP'lerden gelen istekleri kabul et:
```php
// app/Http/Middleware/AllowedIPs.php
if (!in_array($request->ip(), config('mining.allowed_gateway_ips'))) {
    abort(403);
}
```

---

## 🧹 Bakım

### Eski Kayıtları Temizleme

Otomatik temizlik için scheduled task ekleyin:

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Her gün gece yarısı 7 günden eski kayıtları sil
    $schedule->call(function () {
        \App\Models\BeaconReading::cleanOldReadings(7);
    })->daily();
}
```

### Manuel Temizlik

```bash
php artisan tinker
>>> \App\Models\BeaconReading::cleanOldReadings(7);
```

---

## 📈 Performans İpuçları

1. **Index Kullanımı**: Tüm zaman bazlı sorgular için index'ler mevcut
2. **Batch Insert**: Mümkün olduğunca batch insert kullanın
3. **Cache**: Sık kullanılan veriler için cache kullanılabilir
4. **Partition**: Çok büyük veri setleri için tablo partitioning düşünülebilir

---

## 🐛 Hata Ayıklama

### Log Kontrol

```bash
tail -f storage/logs/laravel.log
```

### Request Monitoring

`http://localhost:8000/request-monitor.html` üzerinden tüm istekleri canlı izleyin.

### Veritabanı Kontrol

```bash
php artisan db:table beacon_readings
```

```sql
-- Son 10 kayıt
SELECT * FROM beacon_readings ORDER BY reading_timestamp DESC LIMIT 10;

-- Beacon başına okuma sayısı
SELECT beacon_id, COUNT(*) as count FROM beacon_readings GROUP BY beacon_id;

-- Gateway başına okuma sayısı
SELECT gateway_id, COUNT(*) as count FROM beacon_readings GROUP BY gateway_id;
```

---

## ✨ Özellikler

✅ Gerçek zamanlı beacon takibi
✅ Çoklu format desteği
✅ Batch processing
✅ Otomatik veri temizleme
✅ Kapsamlı indexleme
✅ Mine bazlı filtreleme
✅ Test araçları
✅ Request monitoring
✅ Mock data desteği (development)

---

## 📞 Destek

Sorularınız için issue açabilir veya dokümantasyonu inceleyebilirsiniz.

**Version:** 1.0.0  
**Date:** October 8, 2025
