# RadarWorld - Commercial & Industrial Radar Systems E-commerce

A modern e-commerce platform for selling commercial and industrial radar systems, built with Next.js 15, TypeScript, Tailwind CSS, and Stripe payment integration.

## Features

- 🎯 **Product Catalog**: Browse commercial and industrial radar systems
- 🛒 **Shopping Cart**: Add/remove products with quantity management
- 💳 **Stripe Integration**: Secure payment processing
- 📱 **Responsive Design**: Works seamlessly on all devices
- ⚡ **Fast Performance**: Optimized with Next.js App Router
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payment**: Stripe
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Stripe account (get your API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys))

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your Stripe keys:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_DOMAIN=http://localhost:3000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
radarworld/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   └── checkout/         # Stripe checkout API
│   ├── cart/                 # Shopping cart page
│   ├── checkout/             # Checkout flow pages
│   │   ├── success/          # Payment success page
│   │   └── cancel/           # Payment cancelled page
│   ├── product/[id]/         # Product detail pages
│   ├── shop/                 # Product listing page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── Navigation.tsx        # Header navigation
│   ├── Footer.tsx            # Footer component
│   └── ProductCard.tsx       # Product card component
├── context/                  # React context
│   └── CartContext.tsx       # Shopping cart state management
├── data/                     # Static data
│   └── products.ts           # Product catalog
├── lib/                      # Utility libraries
│   └── stripe.ts             # Stripe configuration
├── types/                    # TypeScript types
│   └── product.ts            # Product type definitions
└── public/                   # Static assets
```

## Product Categories

The platform features two main categories of radar systems:

1. **Commercial Radars**:
   - Maritime Navigation Radar
   - Traffic Monitoring Radar
   - Drone Detection Radar
   - Weather Surveillance Radar

2. **Industrial Radars**:
   - Industrial Level Sensor
   - Perimeter Security Radar
   - Mining Collision Avoidance
   - Port Automation Radar

## Deployment to Vercel

### Quick Deploy

1. **Push your code to GitHub** (already done in this branch)

2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables**:
   Add these in Vercel's project settings:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   STRIPE_SECRET_KEY=sk_live_your_key
   NEXT_PUBLIC_DOMAIN=https://your-domain.vercel.app
   ```

4. **Deploy**:
   Vercel will automatically build and deploy your application

### Custom Domain

To use a custom domain:
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_DOMAIN` environment variable

## Stripe Setup

### Test Mode

For development, use Stripe's test mode:
- Use test API keys (pk_test_... and sk_test_...)
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

### Production Mode

For live payments:
1. Complete Stripe account verification
2. Replace test keys with live keys (pk_live_... and sk_live_...)
3. Configure webhooks in Stripe Dashboard
4. Set up proper error handling and logging

## Customization

### Adding Products

Edit `data/products.ts` to add or modify products:

```typescript
{
  id: "unique-product-id",
  name: "Product Name",
  description: "Product description",
  price: 50000,
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

The project uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Support

For issues or questions:
- Check Stripe documentation: https://stripe.com/docs
- Check Next.js documentation: https://nextjs.org/docs
- Check Vercel documentation: https://vercel.com/docs

## License

This project is private and proprietary.

## Next Steps

1. ✅ Set up Stripe account and get API keys
2. ✅ Configure environment variables
3. ✅ Test the application locally
4. ✅ Deploy to Vercel
5. 🔄 Add real product images
6. 🔄 Set up Stripe webhooks for order fulfillment
7. 🔄 Add email notifications
8. 🔄 Implement user authentication (optional)
9. 🔄 Add admin panel for product management (optional)
