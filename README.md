# 🎯 RadarWorld - Next-Generation Radar E-Commerce Platform

A cutting-edge e-commerce platform for commercial and industrial radar systems, featuring a futuristic **Tactical Dashboard** aesthetic with 3D WebGL visualizations and premium UI/UX design.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000)

## 🌟 Features

### 🎨 Design & UI
- **Tactical Dashboard Aesthetic**: Dark mode HUD-style interface with precision engineering feel
- **3D WebGL Hero**: Interactive radar scanner with custom GLSL shaders and dither effects
- **Glassmorphism UI**: Frosted glass effects with 1px Electric Cyan borders
- **Animated Effects**: Scanlines, HUD grids, glitch effects, border animations
- **Responsive Design**: Mobile-first approach with optimized 3D rendering

### 🛒 E-Commerce Functionality
- **16+ Radar Products**: Commercial and industrial radar systems (77GHz, 80GHz, 120GHz)
- **Shopping Cart**: LocalStorage persistence with real-time updates
- **Stripe Integration**: Secure checkout with Checkout Sessions API
- **Product Catalog**: Detailed specifications, pricing, and technical data
- **Dynamic Product Pages**: Server-side rendering with Next.js 15 App Router

### 🚀 Performance
- **Optimized WebGL**: Dynamic imports, efficient rendering, mobile optimization
- **Code Splitting**: Route-based splitting for faster load times
- **Image Optimization**: WebP format with Next.js Image component
- **SSR Compatible**: All 3D components work with server-side rendering

### 📈 Marketing Features
- **SEO Strategy**: 200+ keywords, content calendar, technical optimization
- **TikTok Marketing Plan**: 30+ video ideas, viral content strategy
- **Google Ads Strategy**: $7k/month campaign structure
- **Stripe Setup Guide**: Complete payment integration documentation

## 🎯 Design System

### Color Palette
```css
--obsidian-blue: #0B1021;    /* Deep background */
--electric-cyan: #00F0FF;     /* Primary accent, CTAs */
--radar-green: #00FF41;       /* Status indicators */
--tech-gray: #8B9DC3;         /* Secondary text */
```

### Typography
- **Headers**: Geometric sans-serif (Inter, -apple-system)
- **Technical Data**: JetBrains Mono (tabular numbers)
- **Icons**: Bracket-enclosed `[ ICON ]` style

### Visual Effects
- **Glassmorphism**: `backdrop-filter: blur(12px)` with semi-transparent backgrounds
- **Scanlines**: Animated horizontal line overlay for HUD effect
- **HUD Grid**: 40x40px grid pattern with Electric Cyan
- **Corner Brackets**: Decorative border elements on cards
- **Glow Effects**: Cyan and green glow on interactive elements

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15.5.6**: App Router, Server Components, API Routes
- **React 19**: Latest features with concurrent rendering
- **TypeScript**: Type-safe development
- **Tailwind CSS 3**: Utility-first styling

### 3D & Animations
- **Three.js**: 3D WebGL rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and abstractions
- **@react-three/postprocessing**: Bloom, chromatic aberration, noise effects
- **Framer Motion**: Scroll-based and interactive animations
- **GSAP**: Timeline animations

### Payment & Commerce
- **Stripe**: Payment processing with Checkout Sessions API
- **LocalStorage**: Cart persistence

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account (for payment processing)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/umtkyck/radarworld.git
cd radarworld
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables**
Create a `.env.local` file in the root directory:
```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# App URL
NEXT_PUBLIC_DOMAIN=http://localhost:3000

# Optional: Production Stripe keys
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
# STRIPE_SECRET_KEY=sk_live_your_key_here
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
```bash
vercel
```

2. **Configure environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_DOMAIN`

3. **Deploy**
```bash
vercel --prod
```

See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for detailed deployment guide.

## 📁 Project Structure

```
radarworld/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API routes
│   │   └── checkout/             # Stripe checkout endpoint
│   ├── cart/                     # Shopping cart page
│   ├── checkout/                 # Checkout flow
│   ├── product/[id]/            # Dynamic product pages
│   ├── shop/                     # Product catalog
│   ├── globals.css               # Global styles & tactical design system
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage with 3D WebGL
│   ├── icon.svg                  # Favicon
│   └── opengraph-image.svg      # Social media preview
│
├── components/                   # React components
│   ├── 3d/                       # WebGL components
│   │   ├── RadarScanner.tsx     # Custom radar with GLSL shaders
│   │   └── Scene.tsx            # WebGL canvas with post-processing
│   ├── FeaturesModern.tsx       # Feature cards with glassmorphism
│   ├── HeroModern.tsx           # 3D hero section
│   └── Navigation.tsx           # Glass navbar with active states
│
├── context/                      # React Context
│   └── CartContext.tsx          # Shopping cart state management
│
├── data/                         # Static data
│   └── products.ts              # 16 radar products catalog
│
├── lib/                          # Utilities
│   └── stripe.ts                # Stripe configuration
│
├── public/                       # Static assets
│
├── docs/                         # Documentation
│   ├── STRIPE_SETUP.md          # Payment integration guide
│   ├── SEO_STRATEGY.md          # SEO and content strategy
│   ├── TIKTOK_MARKETING_PLAN.md # Social media marketing
│   ├── GOOGLE_ADS_STRATEGY.md   # Paid advertising strategy
│   ├── VERCEL_DEPLOY.md         # Deployment guide
│   └── DESIGN_SYSTEM.md         # Complete design documentation
│
├── .env.local                    # Environment variables (create this)
├── .env.production.template      # Production env template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎨 Key Components

### HeroModern
3D WebGL hero section with:
- Dynamic radar scanner background
- Glassmorphism content overlay
- Animated scanlines
- Bracket-styled UI elements
- Technical frequency specs

### FeaturesModern
Feature showcase with:
- Glass-strong cards
- Technical spec badges
- Corner bracket decorations
- Hover animations with Electric Cyan glow

### RadarScanner (3D)
Custom Three.js component featuring:
- Rotating radar waves with dither shader
- Concentric rings (8 levels)
- Animated scan line
- Target blips (green dots)
- Real-time WebGL rendering

### Navigation
Tactical navbar with:
- Glassmorphism background
- Active page indicators
- Cart badge with Radar Green pulse
- Bracket-enclosed navigation items

## 🛍️ Products

The platform features 16 commercial and industrial radar systems:

### Original Radar Systems
1. Industrial 77GHz Radar - $2,499
2. Maritime 77GHz Long-Range - $3,999
3. 80GHz Multi-Target Tracker - $4,299
4. 77GHz Automotive ADAS - $1,899
5. 120GHz High-Resolution Imaging - $8,999
6. Industrial 80GHz Safety System - $3,499
7. 77GHz Traffic Monitoring - $2,799
8. Construction Site Monitor - $2,299

### ZLY RADAR Products
9. ZLY 77GHz Long Range LRR230PRO - $3,200
10. ZLY 77GHz Automotive ARS408 - $2,800
11. ZLY 80GHz Industrial ISR200 - $4,500
12. ZLY 77GHz Maritime MRS300 - $3,900
13. ZLY 120GHz Imaging HIR500 - $9,500
14. ZLY 77GHz Traffic TMS250 - $2,900
15. ZLY 80GHz Safety SSR350 - $3,700
16. ZLY 77GHz Construction CSR180 - $2,400

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:3000
npm run build        # Build production bundle
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
vercel              # Deploy to Vercel
vercel --prod       # Deploy to production
```

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Git Hooks**: Pre-commit checks (optional)

## 📊 Performance Metrics

Target Lighthouse scores:
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

Optimization features:
- Code splitting by route
- Dynamic imports for 3D components
- Image optimization (WebP)
- Lazy loading below fold
- Efficient WebGL rendering

## 🎯 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

**Note**: WebGL support required for 3D features. Fallback provided for unsupported devices.

## 📝 Documentation

Comprehensive documentation available in `/docs`:
- [Stripe Setup Guide](./STRIPE_SETUP.md)
- [SEO Strategy](./SEO_STRATEGY.md)
- [TikTok Marketing Plan](./TIKTOK_MARKETING_PLAN.md)
- [Google Ads Strategy](./GOOGLE_ADS_STRATEGY.md)
- [Vercel Deployment](./VERCEL_DEPLOY.md)
- [Design System](./DESIGN_SYSTEM.md)

## 🔐 Stripe Setup

### Test Mode (Development)

For development, use Stripe's test mode:
- Use test API keys (pk_test_... and sk_test_...)
- Test card number: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any postal code

### Production Mode

For live payments:
1. Complete Stripe account verification
2. Replace test keys with live keys in Vercel
3. Configure webhooks in Stripe Dashboard
4. Set up proper error handling and logging
5. Test thoroughly before going live

## 🎨 Customization

### Adding Products

Edit `data/products.ts` to add or modify products:

```typescript
{
  id: "unique-product-id",
  name: "Product Name",
  description: "Product description",
  price: 50000, // Price in cents ($500.00)
  category: "commercial" or "industrial",
  image: "image-url",
  features: ["Feature 1", "Feature 2"],
  specifications: {
    range: "Range value",
    frequency: "Frequency value",
    power: "Power value",
    resolution: "Resolution value"
  },
  inStock: true
}
```

### Styling

The project uses Tailwind CSS with custom tactical dashboard utilities:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles, custom utilities, animations

Custom CSS classes:
- `.glass` - Glassmorphism effect
- `.glass-strong` - Stronger glass effect
- `.font-tech` - Technical monospace font
- `.bracket-icon` - Bracket-enclosed styling
- `.hud-grid` - HUD grid background
- `.scanline` - Animated scanline effect
- `.border-flow` - Animated border
- `.pulse-green` - Green glow pulse
- `.text-glitch` - Glitch text effect

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- **Three.js** - 3D WebGL rendering
- **Vercel** - Hosting and deployment
- **Stripe** - Payment processing
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animation library

## 📞 Support

For questions or support:
- Documentation: Check `/docs` folder
- GitHub Issues: [github.com/umtkyck/radarworld/issues](https://github.com/umtkyck/radarworld/issues)
- Stripe Docs: [stripe.com/docs](https://stripe.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Built with ❤️ using Next.js 15, Three.js, and cutting-edge web technologies**

**Design System Version**: 2.0 (Tactical Dashboard Edition)
**Last Updated**: November 2025
