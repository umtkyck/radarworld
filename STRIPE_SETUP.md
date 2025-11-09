# 💳 Stripe Ödeme Sistemi Kurulum Rehberi

## 🎯 Genel Bakış

RadarWorld'de Stripe ödeme sistemi **tamamen entegre** edilmiş durumda. Sadece API anahtarlarını eklemeniz gerekiyor!

---

## ✅ Kurulu Olan Özellikler

### 1. **Stripe Checkout Integration**
- ✅ `/app/api/checkout/route.ts` - API endpoint
- ✅ `/lib/stripe.ts` - Stripe konfigürasyonu
- ✅ `/app/checkout/page.tsx` - Checkout sayfası
- ✅ Success ve Cancel sayfaları
- ✅ Sepet sistemi (localStorage)

### 2. **Ödeme Akışı**
```
Ürün Seç → Sepete Ekle → Checkout → Stripe → Ödeme → Success
```

### 3. **Desteklenen Özellikler**
- ✅ Kredi/Debit kartlar
- ✅ Fatura adresi toplama
- ✅ Teslimat adresi toplama
- ✅ Çoklu para birimi desteği (USD default)
- ✅ Güvenli 3D Secure
- ✅ Otomatik vergi hesaplama (opsiyonel)

---

## 🚀 Adım Adım Kurulum

### Adım 1: Stripe Hesabı Oluştur (5 dakika)

1. **Stripe'a git**: https://dashboard.stripe.com/register

2. **Hesap Oluştur**:
   - Email adresi
   - İşletme adı: RadarWorld
   - Ülke: Türkiye (veya bulunduğunuz ülke)
   - İşletme tipi: E-commerce

3. **Email Doğrulama**:
   - Gelen maili kontrol et
   - Linke tıklayarak doğrula

4. **İşletme Bilgileri**:
   - Şirket adı
   - Adres
   - Telefon
   - Website (opsiyonel)

---

### Adım 2: API Anahtarlarını Al (2 dakika)

#### Test Mode (Geliştirme İçin)

1. **Stripe Dashboard'a git**: https://dashboard.stripe.com

2. **Test Mode'a geç**:
   - Sağ üstte "Test mode" toggle'ını AÇ (🔴)

3. **API Keys sayfasına git**:
   - https://dashboard.stripe.com/test/apikeys
   - VEYA: Developers → API keys

4. **Anahtarları kopyala**:

   **Publishable key** (Herkes görebilir):
   ```
   pk_test_51...
   ```
   → Bu anahtarı kopyala

   **Secret key** (GİZLİ - kimseyle paylaşma):
   ```
   sk_test_51...
   ```
   → "Reveal test key" butonuna tıkla
   → Anahtarı kopyala

---

### Adım 3: .env.local Dosyasını Düzenle (1 dakika)

1. **Projeyi aç**:
   ```bash
   cd /home/user/radarworld
   ```

2. **`.env.local` dosyasını düzenle**:
   ```bash
   nano .env.local
   ```
   VEYA favori text editörünü kullan

3. **Anahtarları yapıştır**:
   ```env
   # BURAYA KOPYALADIĞIN ANAHTARLARI YAPIŞTIR
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51QYr2vP3LNq... (senin anahtarın)
   STRIPE_SECRET_KEY=sk_test_51QYr2vP3LNq... (senin anahtarın)

   # Domain ayarı (local için böyle kalsın)
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   ```

4. **Kaydet ve kapat**:
   - `Ctrl + X`
   - `Y`
   - `Enter`

---

### Adım 4: Development Server'ı Yeniden Başlat (1 dakika)

Environment variables değiştiği için server'ı yeniden başlatmalısın:

```bash
# Çalışan server'ı durdur
Ctrl + C

# Yeniden başlat
npm run dev
```

Server başladığında:
```
✓ Ready in 3s
Local:    http://localhost:3000
```

---

### Adım 5: Ödeme Sistemini Test Et (5 dakika)

#### Test Checkout Akışı:

1. **Siteyi aç**: http://localhost:3000

2. **Ürün ekle**:
   - Shop sayfasına git
   - Herhangi bir ürün seç
   - "Add to Cart" tıkla

3. **Sepete git**: http://localhost:3000/cart

4. **Checkout**:
   - "Proceed to Checkout" tıkla
   - "Proceed to Payment" tıkla
   - Stripe sayfasına yönlendirileceksin ✅

5. **Test kartı bilgilerini gir**:
   ```
   Kart Numarası: 4242 4242 4242 4242
   Son Kullanma: 12/34 (gelecekteki herhangi bir tarih)
   CVC: 123 (herhangi 3 rakam)
   Posta Kodu: 12345
   ```

6. **Email gir**: test@example.com

7. **Pay** butonuna tıkla

8. **Success sayfasını gör**:
   - ✅ Ödeme başarılı mesajı
   - Sepet otomatik temizlendi

---

## 🧪 Test Kartları

Stripe'ın test kartlarını kullanarak farklı senaryoları test edebilirsin:

### Başarılı Ödeme:
```
4242 4242 4242 4242 - Başarılı
```

### 3D Secure (Güvenlik Testi):
```
4000 0027 6000 3184 - 3D Secure isteyecek
```

### Başarısız Ödeme:
```
4000 0000 0000 0002 - Kart reddedilir
```

### Yetersiz Bakiye:
```
4000 0000 0000 9995 - Yetersiz bakiye
```

### Detaylı liste: https://stripe.com/docs/testing

---

## 🌍 Production'a Alma (Canlıya Çıkış)

### Ne Zaman Production'a Geçmeli?

- ✅ Tüm testler başarılı
- ✅ Stripe hesap doğrulaması tamamlandı
- ✅ Website canlıda (Vercel)
- ✅ İade politikası hazır
- ✅ Gizlilik politikası hazır
- ✅ Müşteri destek sistemi hazır

### Production API Anahtarları:

1. **Stripe Dashboard'da Test Mode'u KAPAT**

2. **Production API Keys'e git**:
   - https://dashboard.stripe.com/apikeys
   - NOT: Test mode kapalı olmalı

3. **Live anahtarları al**:
   ```
   pk_live_51...  (Publishable key)
   sk_live_51...  (Secret key)
   ```

4. **Vercel'de Environment Variables güncelle**:
   - Vercel Dashboard → Settings → Environment Variables
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → pk_live_...
   - `STRIPE_SECRET_KEY` → sk_live_...
   - `NEXT_PUBLIC_DOMAIN` → https://radarworld.com
   - **Redeploy** et

---

## 💰 Stripe Ücretleri

### Standart Ücretler (Türkiye):
- **Yerli kartlar**: %2.9 + ₺0.25 per transaction
- **Yabancı kartlar**: %3.9 + ₺0.25 per transaction
- **Çekilen para**: Ücretsiz (aylık)

### Örnek Hesaplama:
```
Ürün fiyatı: $45,000
Stripe ücreti: $1,305 + $0.25 = $1,305.25
Sana kalan: $43,694.75
```

### Ödeme Alımlarda Gecikme:
- İlk ödemeler: 7-14 gün
- Sonraki ödemeler: 2-7 gün
- Express payout: +1% ücretle hemen

---

## 🔔 Webhook Kurulumu (İleri Seviye)

Webhooks ile ödeme durumunu otomatik takip edebilirsin.

### Webhook Endpoint Oluştur:

1. **Webhook handler dosyası oluştur**:
   `/app/api/webhook/stripe/route.ts`

2. **Stripe Dashboard'da webhook ekle**:
   - Developers → Webhooks → Add endpoint
   - URL: `https://radarworld.com/api/webhook/stripe`
   - Events seç:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`

3. **Webhook secret al**:
   ```
   whsec_...
   ```

4. **Environment variable ekle**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Örnek Webhook Handler:

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // TODO: Siparişi veritabanına kaydet
      // TODO: Müşteriye email gönder
      // TODO: Stok güncelle
      console.log("Payment successful:", session.id);
      break;

    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful:", paymentIntent.id);
      break;

    case "payment_intent.payment_failed":
      const failedPayment = event.data.object;
      console.log("Payment failed:", failedPayment.id);
      // TODO: Müşteriye bildirim gönder
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

---

## 📧 Email Bildirimleri

### Stripe Email Ayarları:

1. **Stripe Dashboard → Settings → Emails**

2. **Aktif et**:
   - ✅ Customer receipts (Müşteriye fatura)
   - ✅ Failed payments (Başarısız ödemeler)
   - ✅ Successful payments (Başarılı ödemeler)

3. **Email template'leri özelleştir**:
   - Logo ekle
   - Renkleri ayarla
   - Footer bilgisi ekle

### Custom Email (İleri Seviye):

Webhook'larla kendi email sisteminizi kurabilirsiniz:
- SendGrid
- Mailgun
- AWS SES
- Resend

---

## 🛡️ Güvenlik En İyi Uygulamalar

### ✅ Yapılması Gerekenler:

1. **API anahtarlarını asla commit etme**:
   - `.env.local` dosyası `.gitignore`'da ✅
   - Asla public repo'da paylaşma

2. **HTTPS kullan**:
   - Production'da sadece HTTPS
   - Vercel otomatik sağlıyor ✅

3. **Webhook signature doğrula**:
   - Her webhook request'i doğrula
   - Sahte istekleri reddet

4. **Rate limiting ekle**:
   - Aşırı istek yapılmasını engelle
   - Vercel Edge Functions ile

5. **Loglama yap**:
   - Tüm ödeme işlemlerini logla
   - Hata takibi için

### ❌ Yapılmaması Gerekenler:

1. ❌ Secret key'i frontend'e gönderme
2. ❌ API anahtarlarını hardcode etme
3. ❌ Test mode'da production kullanma
4. ❌ Webhook signature doğrulama atlama
5. ❌ HTTP ile ödeme alma

---

## 🔍 Sorun Giderme

### Problem: "Stripe is not defined" hatası

**Çözüm**:
```bash
npm install stripe @stripe/stripe-js
```

---

### Problem: Checkout sayfası yüklenmiyor

**Çözüm**:
1. API anahtarlarını kontrol et
2. `.env.local` doğru mu?
3. Server yeniden başlat
4. Browser console'u kontrol et

---

### Problem: Stripe sayfasına yönlendirilmiyor

**Çözüm**:
1. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` doğru mu?
2. `pk_test_` ile başlıyor mu?
3. Browser console hatası var mı?

---

### Problem: "Invalid API key" hatası

**Çözüm**:
1. Test mode aktif mi? (Stripe Dashboard)
2. Anahtarı kopyalarken tamamını aldın mı?
3. Boşluk veya özel karakter var mı?

---

### Problem: Payment başarılı ama success sayfası açılmıyor

**Çözüm**:
1. `NEXT_PUBLIC_DOMAIN` doğru mu?
2. Success URL konfigürasyonu:
   ```typescript
   success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
   ```

---

## 📊 Stripe Dashboard Özellikleri

### 1. **Payments**
- Tüm ödemeleri gör
- Filtreleme ve arama
- Export (CSV, PDF)

### 2. **Customers**
- Müşteri listesi
- Ödeme geçmişi
- Contact bilgileri

### 3. **Products** (Opsiyonel)
- Stripe'da ürün oluşturabilirsin
- Fiyatlandırma yönetimi
- Şu an kullanmıyoruz (dinamik ürün oluşturuyoruz)

### 4. **Reports**
- Gelir raporları
- Başarı oranları
- Ortalama sipariş değeri

### 5. **Developers**
- API keys
- Webhooks
- Logs
- API requests

---

## 🎯 Kontrol Listesi

### Local Test:
- [ ] Stripe hesabı oluşturuldu
- [ ] Test API anahtarları alındı
- [ ] `.env.local` dosyası güncellendi
- [ ] Dev server yeniden başlatıldı
- [ ] Test kartı ile ödeme yapıldı
- [ ] Success sayfası görüldü
- [ ] Stripe Dashboard'da ödeme görüldü

### Production:
- [ ] Stripe hesap doğrulaması tamamlandı
- [ ] Live API anahtarları alındı
- [ ] Vercel environment variables güncellendi
- [ ] HTTPS aktif
- [ ] Webhook kuruldu
- [ ] Email bildirimleri aktif
- [ ] İade politikası hazır
- [ ] Test ödemesi yapıldı

---

## 💡 İpuçları

### 1. **Test Mode'u Kullan**
- Geliştirme sırasında hep test mode
- Gerçek para harcanmaz
- Sınırsız test

### 2. **Stripe Dashboard'u İzle**
- Her testten sonra Dashboard'u kontrol et
- Log'ları oku
- Hataları anında gör

### 3. **Mobilde Test Et**
- Mobil tarayıcıda da test et
- Stripe responsive
- Farklı ekran boyutları

### 4. **Customer Experience**
- Checkout hızlı olmalı
- Az bilgi iste
- Güven badge'leri ekle

### 5. **Email Gönd er**
- Her başarılı ödemeden sonra email
- Fatura bilgileri
- Sipariş takip

---

## 📞 Destek & Kaynaklar

### Stripe Dokümantasyon:
- **Ana Docs**: https://stripe.com/docs
- **Checkout**: https://stripe.com/docs/payments/checkout
- **Test Cards**: https://stripe.com/docs/testing
- **Webhooks**: https://stripe.com/docs/webhooks

### Stripe Destek:
- **Email**: support@stripe.com
- **Chat**: Dashboard → Help
- **Forum**: https://support.stripe.com

### Next.js + Stripe:
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Next.js**: https://github.com/stripe-samples/nextjs-typescript-react-stripe-js

---

## ✅ Özet

RadarWorld'de Stripe entegrasyonu **tamamen hazır**!

**Tek yapman gereken:**
1. ✅ Stripe hesabı aç
2. ✅ API anahtarlarını al
3. ✅ `.env.local`'a yapıştır
4. ✅ Test et!

**5 dakikada hazırsın!** 🚀

---

## 🎉 Tebrikler!

Artık RadarWorld'de **güvenli ödeme sistemi** var!

**Müşteriler şunları yapabilir:**
- ✅ Ürünleri sepete ekleyebilir
- ✅ Güvenle ödeme yapabilir
- ✅ Kredi kartıyla ödeyebilir
- ✅ Fatura bilgisi girebilir
- ✅ Teslimat adresi verebilir

**Siz şunları yapabilirsiniz:**
- ✅ Ödemeleri Stripe'da görebilirsiniz
- ✅ Müşteri bilgilerini alabilirsiniz
- ✅ Parayı hesabınıza çekebilirsiniz
- ✅ Raporlama yapabilirsiniz

**Başarılar! 💰**
