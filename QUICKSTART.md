# 🚀 RadarWorld - Hızlı Başlangıç Kılavuzu

## ✅ Tamamlanmış Adımlar

Her şey hazır! Aşağıdaki işlemler tamamlandı:

1. ✅ **Proje Kurulumu**
   - Next.js 15 + TypeScript + Tailwind CSS
   - Tüm bağımlılıklar yüklendi (378 paket)
   - Build hatası yok, her şey çalışıyor

2. ✅ **E-ticaret Özellikleri**
   - Ana sayfa (marketing içeriği)
   - Ürün kataloğu (8 radar ürünü)
   - Alışveriş sepeti
   - Ödeme sistemi (Stripe entegrasyonu)
   - Ürün detay sayfaları

3. ✅ **Development Server**
   - Server çalışıyor: **http://localhost:3000**
   - Otomatik yeniden yükleme aktif
   - Hazır ve kullanıma açık

4. ✅ **Git Repository**
   - Tüm kod commit edildi
   - GitHub'a push edildi
   - Branch: `claude/radar-vertical-website-marketing-011CUwVFVqepGNjfPZv4VJKr`

## 🌐 Web Sitesini Görüntüle

Server çalışıyor! Tarayıcınızda açın:

**http://localhost:3000**

### Sayfalar:

- 🏠 **Ana Sayfa**: http://localhost:3000
- 🛍️ **Shop**: http://localhost:3000/shop
- 🛒 **Sepet**: http://localhost:3000/cart
- 💳 **Checkout**: http://localhost:3000/checkout

## 💳 Stripe Kurulumu (Önemli!)

Ödeme sistemini test etmek için Stripe API anahtarlarını eklemeniz gerekiyor:

### Adım 1: Stripe Hesabı Oluştur
1. https://dashboard.stripe.com/register adresine gidin
2. Ücretsiz hesap oluşturun

### Adım 2: API Anahtarlarını Al
1. https://dashboard.stripe.com/test/apikeys adresine gidin
2. **Publishable key** (pk_test_ ile başlar) kopyalayın
3. **Secret key** (sk_test_ ile başlar) kopyalayın

### Adım 3: .env.local Dosyasını Düzenle

`.env.local` dosyasını açın ve API anahtarlarınızı ekleyin:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_BURAYA_SENİN_ANAHTARIN
STRIPE_SECRET_KEY=sk_test_BURAYA_SENİN_ANAHTARIN
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

### Adım 4: Server'ı Yeniden Başlat

Terminal'de `Ctrl+C` yapın ve tekrar başlatın:
```bash
npm run dev
```

### Test Kartı Bilgileri

Ödeme testi için bu bilgileri kullanın:
- **Kart Numarası**: 4242 4242 4242 4242
- **Son Kullanma**: Gelecekteki herhangi bir tarih
- **CVC**: Herhangi 3 rakam
- **Posta Kodu**: Herhangi bir kod

## 📦 Ürünler

Sitede şu kategorilerde 8 radar ürünü var:

### Ticari Radarlar:
1. Maritime Navigation Radar - $45,000
2. Traffic Monitoring Radar - $15,000
3. Drone Detection Radar - $35,000
4. Weather Surveillance Radar - $125,000

### Endüstriyel Radarlar:
1. Industrial Level Sensor - $8,500
2. Perimeter Security Radar - $65,000
3. Mining Collision Avoidance - $28,000
4. Port Automation Radar - $55,000

## 🚀 Vercel'e Deploy Et

### Hızlı Deploy:

1. **Vercel hesabı oluştur**: https://vercel.com
2. **GitHub ile bağlan**
3. **radarworld** projesini import et
4. **Environment Variables** ekle:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_DOMAIN=https://your-domain.vercel.app
   ```
5. **Deploy**'a tıkla!

Detaylı deploy talimatları için `DEPLOYMENT.md` dosyasına bakın.

## 📁 Proje Yapısı

```
radarworld/
├── app/                   # Next.js sayfalar
│   ├── page.tsx          # Ana sayfa
│   ├── shop/             # Ürün listesi
│   ├── cart/             # Sepet
│   ├── checkout/         # Ödeme
│   └── product/[id]/     # Ürün detayları
├── components/           # React bileşenler
├── data/                 # Ürün verileri
├── lib/                  # Stripe konfigürasyon
└── types/               # TypeScript tipleri
```

## 🛠️ Geliştirme Komutları

```bash
# Development server (çalışıyor!)
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint
```

## 📝 Önemli Notlar

1. **Stripe Anahtarları**: Test modunda (pk_test_ / sk_test_) başlayın
2. **Production**: Canlıya alırken live anahtarlarını (pk_live_ / sk_live_) kullanın
3. **Güvenlik**: .env.local dosyası .gitignore'da, asla commit edilmez
4. **Görüntüler**: Şu an Unsplash'tan geliyor, kendi görsellerinizi ekleyebilirsiniz

## ✅ Kontrol Listesi

- [x] Next.js kurulumu
- [x] Ürün kataloğu oluşturuldu
- [x] Alışveriş sepeti çalışıyor
- [x] Stripe entegrasyonu tamamlandı
- [x] Responsive tasarım
- [x] Build başarılı
- [x] Dev server çalışıyor
- [x] GitHub'a push edildi
- [ ] Stripe API anahtarlarını ekle (.env.local)
- [ ] Vercel'e deploy et
- [ ] Kendi domain'ini bağla (isteğe bağlı)

## 🎯 Sonraki Adımlar

1. **ŞİMDİ**: Stripe hesabı oluştur ve API anahtarlarını ekle
2. **TEST**: Ödeme akışını test et (4242 4242 4242 4242)
3. **ÖZELLEŞTIR**: Kendi ürün görsellerini ve açıklamalarını ekle
4. **DEPLOY**: Vercel'e deploy et
5. **CANLI**: Live Stripe anahtarları ile canlıya al

## 💡 İpuçları

- Ürün eklemek/düzenlemek için: `data/products.ts`
- Renkler ve stiller için: `tailwind.config.ts` ve `app/globals.css`
- Yeni sayfalar eklemek için: `app/` klasöründe yeni klasör oluştur

## 📞 Destek

- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Docs**: https://stripe.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## 🎉 Tebrikler!

RadarWorld e-ticaret platformunuz hazır ve çalışıyor!

**Server çalışıyor**: http://localhost:3000

Sadece Stripe anahtarlarını ekleyin ve ödeme testlerine başlayabilirsiniz!
