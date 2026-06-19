# Bütçe Takibi

React ile geliştirdiğim kişisel bütçe takip uygulaması. Gelir ve gider girişlerini kategoriye göre kaydedip anlık bakiyeyi ve kategori dağılımını görmeyi sağlıyor.

## Özellikler

- Gelir / gider ekleme, düzenleme, silme (CRUD)
- Tarayıcı LocalStorage ile veri kalıcılığı
- Toplam gelir, gider ve net bakiye özeti
- Kategori bazlı pasta grafiği (recharts)
- Bakiyenin USD, EUR, GBP karşılığı — anlık döviz kuru API'sinden
- Açıklamaya göre arama
- Tarih aralığı filtresi (Bu Ay / Geçen Ay / Son 7 Gün)
- Mobil uyumlu, responsive tasarım

## Kullanılan Teknolojiler

- React 19
- Vite
- Tailwind CSS v4
- Recharts (grafik için)
- ExchangeRate API (`open.er-api.com`)

## Klasör Yapısı

```
src/
├── components/      Bileşenler (BalanceSummary, TransactionForm, vs.)
├── pages/           Sayfalar (HomePage)
├── interfaces/      Veri modeli (transaction.js)
└── hooks/           Özel hook'lar (useTransactions, useExchangeRates, useFilteredTransactions)
```

## Kurulum

```bash
git clone https://github.com/EnesSoydan/Butce_Takibi.git
cd Butce_Takibi
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışır.

## Production Build

```bash
npm run build
```

Çıktı `dist/` klasörüne üretilir.

---

Bu proje bir web geliştirme eğitiminin sonuç projesi olarak hazırlanmıştır.
