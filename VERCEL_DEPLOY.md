# 🚀 Vercel'e Deploy Rehberi - Adım Adım

## Vercel Nedir?

Vercel, Next.js'in yapımcısının hosting platformu. Next.js projeleri için **en iyi** seçenek.

**Avantajları:**
- ✅ Ücretsiz plan (hobby projects)
- ✅ Otomatik HTTPS
- ✅ Global CDN
- ✅ Git ile otomatik deploy
- ✅ Sınırsız bandwidth (hobby plan)
- ✅ Preview deployments

---

## 📝 Adım 1: Vercel Hesabı Oluştur

### 1.1 Vercel'e Git
https://vercel.com/signup

### 1.2 Kayıt Ol
**İki seçenek:**
- GitHub ile (ÖNERİLEN) ✅
- Email ile

**GitHub ile kayıt ol:**
1. "Continue with GitHub" tıkla
2. GitHub hesabınla giriş yap
3. Vercel'e izin ver

---

## 📦 Adım 2: Projeyi Import Et

### 2.1 New Project
1. Vercel dashboard'da → **"Add New..." → "Project"**
2. Veya direkt: https://vercel.com/new

### 2.2 Repository Seç
1. "Import Git Repository" bölümünde
2. `radarworld` repository'sini bul
3. **"Import"** butonuna tıkla

**Eğer repository görünmüyorsa:**
- "Adjust GitHub App Permissions" tıkla
- Repository access'i ayarla
- `radarworld` repo'sunu seç

### 2.3 Configure Project

```
Project Name: radarworld
Framework Preset: Next.js (otomatik seçilir)
Root Directory: ./ (default)
Build Command: npm run build (otomatik)
Output Directory: .next (otomatik)
Install Command: npm install (otomatik)
```

**Branch Seçimi:**
Branch: `claude/radar-vertical-website-marketing-011CUwVFVqepGNjfPZv4VJKr`

---

## 🔐 Adım 3: Environment Variables Ekle

**ÇOK ÖNEMLİ!** Stripe anahtarlarını eklemen gerekiyor.

### 3.1 Environment Variables Açılır Menüyü Genişlet
Deploy butonundan ÖNCE:
- "Environment Variables" bölümünü aç

### 3.2 Anahtarları Ekle

**İlk Değişken:**
```
Name: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_51... (senin Stripe public key'in)
```

**İkinci Değişken:**
```
Name: STRIPE_SECRET_KEY
Value: sk_test_51... (senin Stripe secret key'in)
```

**Üçüncü Değişken:**
```
Name: NEXT_PUBLIC_DOMAIN
Value: https://radarworld.vercel.app (deploy sonrası gelecek URL)
```

### 3.3 Environment Seçimi
Her değişken için:
- ✅ Production
- ✅ Preview
- ✅ Development

(Hepsini seç)

---

## 🚀 Adım 4: Deploy Et!

### 4.1 Deploy Butonuna Tıkla
- **"Deploy"** butonuna bas
- Kahve iç ☕ (2-3 dakika sürer)

### 4.2 Deployment Süreci
```
1. Building... (npm run build)
2. Deploying... (production'a yükleme)
3. Ready! ✅
```

### 4.3 Başarılı!
```
🎉 Congratulations! Your project is live!

URL: https://radarworld-xxxx.vercel.app
```

---

## 🌐 Adım 5: Domain Güncelle

Deploy sonrası **mutlaka** yapılması gereken:

### 5.1 Vercel URL'ini Öğren
Örnek: `https://radarworld-abc123.vercel.app`

### 5.2 Environment Variable Güncelle
1. Vercel dashboard → Project Settings
2. Environment Variables
3. `NEXT_PUBLIC_DOMAIN` bul
4. **Edit** tıkla
5. Yeni değer: `https://radarworld-abc123.vercel.app`
6. **Save**

### 5.3 Redeploy
1. Deployments tab'e git
2. En son deployment'ın yanında **"..."** (üç nokta)
3. **"Redeploy"** tıkla

---

## ✅ Adım 6: Test Et!

### 6.1 Siteyi Aç
Vercel'in verdiği URL'i tarayıcıda aç:
```
https://radarworld-xxxx.vercel.app
```

### 6.2 Checkout Test Et
1. Bir ürün seç
2. Add to Cart
3. Checkout
4. Stripe sayfasına yönlendiriliyor mu kontrol et ✅

### 6.3 Test Kartı
```
Kart: 4242 4242 4242 4242
Tarih: 12/34
CVC: 123
```

### 6.4 Success!
Ödeme başarılı olduysa → Her şey çalışıyor! 🎉

---

## 🎨 Adım 7: Custom Domain (Opsiyonel)

### 7.1 Domain Satın Al
- Namecheap.com
- GoDaddy.com
- Domain.com

Örnek: `radarworld.com`

### 7.2 Vercel'de Domain Ekle
1. Project Settings → Domains
2. **"Add Domain"**
3. Domain adını gir: `radarworld.com`
4. **"Add"**

### 7.3 DNS Ayarları
Vercel sana DNS records verecek:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 7.4 Domain Provider'da Ayarla
1. Domain provider'ın DNS settings'ine git
2. Yukarıdaki records'ları ekle
3. Kaydet

### 7.5 Bekle
- DNS propagation: 24-48 saat (genelde 1-2 saat)
- Vercel otomatik SSL certificate oluşturacak

### 7.6 Environment Variable Güncelle (Tekrar)
```
NEXT_PUBLIC_DOMAIN: https://radarworld.com
```

Redeploy et!

---

## 🔄 Otomatik Deployments

### Git Push → Otomatik Deploy

**Artık her push otomatik deploy olur:**

```bash
git add .
git commit -m "Update products"
git push
```

Vercel otomatik olarak:
1. Yeni commit'i tespit eder
2. Build eder
3. Deploy eder
4. 2-3 dakikada canlıda! ✅

### Preview Deployments

Her branch için:
- Otomatik preview URL
- Production'ı etkilemez
- Test için mükemmel

---

## 🎯 Hızlı Deploy (TL;DR)

```
1. https://vercel.com/signup → GitHub ile giriş
2. New Project → radarworld import et
3. Environment Variables:
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   - STRIPE_SECRET_KEY=sk_test_...
   - NEXT_PUBLIC_DOMAIN=https://radarworld.vercel.app
4. Deploy!
5. 3 dakika bekle
6. Test et: https://radarworld-xxxx.vercel.app
7. ✅ BAŞARILI!
```

---

## 📊 Vercel Dashboard Özellikleri

### 1. Deployments
- Tüm deployment geçmişi
- Her commit için ayrı URL
- Rollback özelliği

### 2. Analytics
- Sayfa görüntüleme istatistikleri
- Ziyaretçi sayısı
- Performance metrics

### 3. Logs
- Real-time logs
- Error tracking
- Function logs

### 4. Settings
- Environment variables
- Domains
- Git integration
- Build & Development settings

---

## 🆓 Vercel Ücretsiz Plan Limitleri

### Hobby Plan (Ücretsiz):
- ✅ 100 GB Bandwidth/ay
- ✅ Sınırsız deployment
- ✅ Otomatik HTTPS
- ✅ Global CDN
- ✅ Serverless Functions
- ✅ Analytics (basic)

### Bu Yeterli mi?
**Evet!** İlk 6-12 ay için fazlasıyla yeterli.

**Upgrade ne zaman gerekir?**
- 100 GB+ bandwidth/ay
- Team collaboration
- Password protection
- Advanced analytics

---

## ⚠️ Yaygın Sorunlar ve Çözümleri

### Sorun 1: Build Failed
**Hata:** "Build failed"

**Çözüm:**
```bash
# Önce local'de test et
npm run build

# Hata varsa düzelt
# Sonra push et
```

---

### Sorun 2: Environment Variables Çalışmıyor
**Belirtiler:** Stripe çalışmıyor, boş sayfalar

**Çözüm:**
1. Vercel dashboard → Settings → Environment Variables
2. Tüm değişkenleri kontrol et
3. Değerlerde boşluk var mı kontrol et
4. Redeploy et

---

### Sorun 3: Domain Çalışmıyor
**Belirtiler:** Domain açılmıyor

**Çözüm:**
1. DNS ayarları doğru mu?
2. 24 saat bekle (DNS propagation)
3. https://dnschecker.org/ ile kontrol et

---

### Sorun 4: 404 Hatası
**Belirtiler:** Sayfa bulunamadı

**Çözüm:**
- Next.js routing problemi
- `app/` klasör yapısını kontrol et
- Local'de çalışıyor mu?

---

## 🎓 Vercel CLI (İleri Seviye)

### Install
```bash
npm i -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
vercel
```

### Production Deploy
```bash
vercel --prod
```

---

## 📱 Mobil App gibi Kullan

### iOS (iPhone/iPad):
1. Safari'de siteyi aç
2. Share → Add to Home Screen
3. İsim ver: RadarWorld
4. Add

Artık app gibi açılır! 📱

### Android:
1. Chrome'da aç
2. Menu (⋮) → Install app
3. Install

---

## 🎉 Başarı Kontrol Listesi

Deploy başarılı mı?

- [ ] Site açılıyor (https://radarworld-xxx.vercel.app)
- [ ] Homepage yükleniyor
- [ ] Shop sayfası çalışıyor
- [ ] Ürünler görünüyor
- [ ] Add to cart çalışıyor
- [ ] Checkout'a gidiliyor
- [ ] Stripe sayfası açılıyor
- [ ] Test kartıyla ödeme yapılabiliyor
- [ ] Success sayfası görünüyor
- [ ] Favicon görünüyor
- [ ] Mobile'da çalışıyor

**Hepsi ✅ ise → BAŞARILI! 🎊**

---

## 💡 Pro Tips

### 1. Preview URLs
Her pull request için otomatik preview URL oluşur.
- Feature test et
- Sonra merge et

### 2. Instant Rollback
Bir şey bozulursa:
- Deployments → Önceki deployment
- Promote to Production

### 3. Edge Functions
Vercel Edge Network'te çalışır:
- Ultra-fast
- Global
- Scalable

### 4. Analytics
Ücretsiz bile analytics var:
- Web Vitals
- Top pages
- Real User Monitoring

---

## 🆘 Yardım Kaynakları

### Vercel Docs:
- https://vercel.com/docs

### Next.js Deployment:
- https://nextjs.org/docs/deployment

### Vercel Support:
- https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

---

## ✅ Özet: 5 Dakikada Deploy

```bash
1️⃣ https://vercel.com → GitHub ile giriş
2️⃣ New Project → radarworld seç
3️⃣ Environment Variables ekle (3 adet)
4️⃣ Deploy butonuna bas
5️⃣ 3 dakika bekle
6️⃣ ✅ CANLI!
```

**İlk deploy sonrası:**
- URL'i kopyala
- `NEXT_PUBLIC_DOMAIN` güncelle
- Redeploy et
- Test et
- 🎉 Başarılı!

---

## 🚀 Şimdi Ne Yapmalısın?

### Hemen Şimdi:
1. ✅ https://vercel.com/signup → Hesap aç
2. ✅ RadarWorld'ü import et
3. ✅ Environment variables ekle
4. ✅ Deploy et!

### Deploy Sonrası:
1. ✅ Test et (tüm sayfalar)
2. ✅ Stripe test et
3. ✅ Mobile'da test et
4. ✅ Link'i paylaş! 📱

### Gelecek:
1. 📈 Analytics izle
2. 💰 Google Ads başlat
3. 📱 TikTok'ta paylaş
4. 🌍 Custom domain al

---

**5 dakikada canlıya alabilirsin! Başarılar! 🚀**

Sorularını sor, yardım edeyim! 👨‍💻
