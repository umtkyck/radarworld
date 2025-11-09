# Deployment Guide - RadarWorld

## Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository

Your code is already in the branch: `claude/radar-vertical-website-marketing-011CUwVFVqepGNjfPZv4VJKr`

Make sure all changes are committed and pushed to GitHub.

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### Step 3: Import Project

1. Click "Add New Project"
2. Select "Import Git Repository"
3. Find and select `umtkyck/radarworld`
4. Select the branch: `claude/radar-vertical-website-marketing-011CUwVFVqepGNjfPZv4VJKr`

### Step 4: Configure Build Settings

Vercel will auto-detect Next.js. Verify these settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 5: Add Environment Variables

In the Vercel project settings, add these environment variables:

#### Development/Staging
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_DOMAIN=https://your-project.vercel.app
```

#### Production
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51...
STRIPE_SECRET_KEY=sk_live_51...
NEXT_PUBLIC_DOMAIN=https://radarworld.com
```

### Step 6: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Getting Stripe API Keys

### Test Keys (Development)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in "Test mode" (toggle in the top right)
3. Go to "Developers" → "API keys"
4. Copy:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Starts with `sk_test_` (click "Reveal" to see it)

### Live Keys (Production)

⚠️ **Important**: Only use live keys after:
- Testing thoroughly with test keys
- Completing Stripe account verification
- Setting up proper business information

1. Switch to "Live mode" in Stripe Dashboard
2. Go to "Developers" → "API keys"
3. Copy:
   - **Publishable key**: Starts with `pk_live_`
   - **Secret key**: Starts with `sk_live_`

## Post-Deployment Steps

### 1. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads correctly
- ✅ Shop page shows products
- ✅ Product detail pages work
- ✅ Cart functionality works
- ✅ Checkout redirects to Stripe
- ✅ Test payment with card `4242 4242 4242 4242`
- ✅ Success page shows after payment

### 2. Configure Stripe Webhooks (Optional but Recommended)

For production, set up webhooks to handle payment events:

1. In Stripe Dashboard, go to "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Enter: `https://your-domain.com/api/webhook/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret
6. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### 3. Custom Domain Setup

To use your own domain (e.g., radarworld.com):

1. In Vercel project, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)
6. Update `NEXT_PUBLIC_DOMAIN` environment variable to your custom domain

### 4. Enable Analytics (Optional)

Vercel provides built-in analytics:
1. Go to project "Analytics" tab
2. Enable "Web Analytics"
3. Track page views, performance, and user behavior

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key (visible to frontend) | `pk_test_...` or `pk_live_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side only) | `sk_test_...` or `sk_live_...` |
| `NEXT_PUBLIC_DOMAIN` | Your website domain | `https://radarworld.com` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (optional) | `whsec_...` |

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

### Payment Not Working

- Verify Stripe keys are correct
- Check browser console for errors
- Make sure `NEXT_PUBLIC_DOMAIN` matches your actual domain
- Ensure Stripe account is not restricted

### Images Not Loading

- Use absolute URLs for images
- Consider using Vercel's Image Optimization
- Check CORS settings if using external image sources

## Monitoring

### Vercel Dashboard

Monitor your deployment:
- **Deployments**: View all deployments and their status
- **Analytics**: Track page views and performance
- **Logs**: View runtime logs and errors
- **Usage**: Monitor bandwidth and function execution

### Stripe Dashboard

Monitor payments:
- **Payments**: View all transactions
- **Customers**: See customer information
- **Reports**: Financial reports and analytics

## Automatic Deployments

Vercel automatically deploys when you push to your branch:
1. Push changes to GitHub
2. Vercel detects the push
3. Automatically builds and deploys
4. Deployment URL updates instantly

To disable auto-deployments:
1. Go to project "Settings" → "Git"
2. Configure "Production Branch" and "Ignored Build Step"

## Production Checklist

Before going live:
- [ ] Test all pages and functionality
- [ ] Use live Stripe keys
- [ ] Set up webhook endpoints
- [ ] Configure custom domain
- [ ] Add real product images
- [ ] Test checkout flow with real card
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure email notifications
- [ ] Add privacy policy and terms of service
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Test on mobile devices
- [ ] Optimize images and performance
- [ ] Set up Google Analytics (optional)

## Support

- **Vercel Support**: https://vercel.com/support
- **Stripe Support**: https://support.stripe.com
- **Next.js Docs**: https://nextjs.org/docs
