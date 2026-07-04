# Radar Cart

E-commerce platform for Doppler radar sensors: true ground speed sensing for railroad and agriculture, and ball & swing tracking for sports electronics — with custom OEM engineering.

Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS.

## Features

- **Product catalog** — 24GHz Doppler radar platforms with search, category filters, problem-based filtering, and sorting
- **Shopping cart** — localStorage persistence with real-time updates
- **Stripe checkout** — secure payment via Stripe Checkout Sessions
- **Google sign-in** — authentication with NextAuth v5
- **Firebase (optional)** — orders and contact messages stored in Firestore when configured
- **Support chatbot** — rule-based assistant for common questions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_DOMAIN` | Site URL (used for checkout redirects and metadata) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth for sign-in |
| `AUTH_SECRET` | NextAuth session encryption |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase config (optional; app works without it) |

See `STRIPE_SETUP.md` for Stripe configuration and `VERCEL_DEPLOY.md` for deployment.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm test` | Run Jest test suite |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/            Pages (App Router): home, shop, product, cart, checkout, contact, login
components/     UI components (Navigation, Footer, ProductCard, Chatbot, ...)
context/        Cart state (React Context + localStorage)
data/           Product catalog and category/tag metadata
lib/            Stripe, Firebase, NextAuth, shared constants
types/          TypeScript interfaces
__tests__/      Jest + React Testing Library tests
```
