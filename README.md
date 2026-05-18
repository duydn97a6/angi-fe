# AnGi Frontend

AI-powered food recommendation app - suggests dishes based on your taste, weather, and location.

## Tech Stack

- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript 5.4.0
- **Styling**: Tailwind CSS 3.4.0
- **Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animation**: Framer Motion 11.0.0
- **State Management**:
  - Server state: @tanstack/react-query 5.20.0
  - Client state: Zustand 4.5.0
- **Forms**: react-hook-form 7.50.0 + Zod 3.22.0
- **HTTP Client**: Axios 1.6.0
- **Charts**: Recharts 2.12.0
- **Analytics**: PostHog (posthog-js)
- **PWA**: @ducanh2912/next-pwa
- **Testing**: Vitest + Playwright

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Type check
npm run type-check

# Lint
npm run lint
```

## Environment Variables

Create `.env.local` based on `.env.local.example`:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8080/api/v1` |
| `NEXT_PUBLIC_BASE_URL` | App base URL (for sitemap/robots) | `http://localhost:3000` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps/Places API key | - |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics key | - |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog API host | `https://app.posthog.com` |
| `NEXTAUTH_SECRET` | NextAuth secret for sessions | - |

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth route group (login, register, forgot-password)
│   ├── (main)/                   # Main app route group (home, history, profile, restaurants)
│   ├── onboarding/               # Onboarding flow (region, location, diet, budget, finish)
│   ├── offline/                  # PWA offline fallback
│   ├── layout.tsx                # Root layout (providers, error boundary, PWA metadata)
│   ├── providers.tsx             # QueryClient + PostHog + Toaster providers
│   └── globals.css               # Global styles & animations
├── components/
│   ├── ui/                       # Primitive UI components (Button, Input, Card, etc.)
│   ├── layout/                   # Layout components (Header, BottomNav, ContextBar, Sidebar)
│   ├── recommendation/           # Recommendation components (Card, Grid, CategoryTag, etc.)
│   ├── onboarding/               # Onboarding components (ProgressBar, OptionCard, ChipSelector)
│   ├── feedback/                 # Feedback components (Modal, EmojiSelector, RegretSelector)
│   ├── restaurant/               # Restaurant components (Detail, DishCard, DishList)
│   ├── meal/                     # Meal components (MealEntry, StatsCard, HealthWarning)
│   └── shared/                   # Shared components (ErrorBoundary, PageViewTracker, EmptyState, etc.)
├── lib/
│   ├── api/                      # API client & modules (auth, user, recommendation, etc.)
│   ├── analytics/                # PostHog provider, performance tracking
│   ├── hooks/                    # Custom hooks (useAuth, useLocation, useRecommendation, etc.)
│   ├── stores/                   # Zustand stores (auth, location, onboarding, ui, feedbackSchedule)
│   ├── utils/                    # Utilities (cn, format, validation, token, authCookies)
│   ├── constants/                # Constants (config, routes, messages)
│   └── queryClient.ts            # React Query configuration
└── types/                        # TypeScript type definitions
```

## Key Features

- **AI Recommendations**: Personalized food suggestions based on taste, weather, and location
- **Onboarding**: 5-step flow (region, location, diet, budget, finish)
- **Anti-filter**: Exclude food categories you don't want
- **Feedback System**: Rate meals with emoji, regret level, and tags
- **Meal History**: Track eating patterns with weekly/monthly stats
- **Restaurant Detail**: View menus, delivery links, and dish info
- **PWA**: Installable, offline fallback, service worker caching
- **Analytics**: PostHog event tracking, Core Web Vitals, error boundary
- **Accessibility**: Skip-nav, ARIA labels, keyboard navigation, focus management

## Backend API

The frontend connects to `angi-be` at `NEXT_PUBLIC_API_URL`. Key endpoints:

- Auth: `/auth/login`, `/auth/register`, `/auth/google`
- Users: `/users/me`, `/users/me/preferences`, `/users/me/onboarding/complete`
- Recommendations: `/recommendations`, `/recommendations/{id}/click`
- Restaurants: `/restaurants`, `/restaurants/{id}`, `/restaurants/{id}/dishes`
- Feedback: `/feedback`
- Meals: `/meals/history`, `/meals/stats`
- Context: `/context/weather`

## Deployment

The app is configured for Vercel deployment:

1. Push to GitHub repository
2. Connect repository in Vercel dashboard
3. Set environment variables in Vercel project settings
4. Deploy - Vercel auto-detects Next.js and builds

Key build settings:
- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`

## Documentation

- `docs/01-overview/` - Project overview
- `docs/02-design/` - Design specifications
- `docs/04-frontend/` - Frontend architecture, components, pages
- `implement.md` - Implementation plan & progress tracking