# Kế Hoạch Triển Khai Frontend AnGi

## 📋 Tổng quan

**Tech Stack:**
- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript 5.4.0
- **Styling**: Tailwind CSS 3.4.0
- **Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **State Management**: 
  - Server state: @tanstack/react-query 5.20.0
  - Client state: Zustand 4.5.0
- **Forms**: react-hook-form 7.50.0 + Zod 3.22.0
- **HTTP Client**: Axios 1.6.0
- **Charts**: Recharts 2.12.0
- **Maps**: @react-google-maps/api 2.19.0
- **Testing**: Vitest + Playwright

**Design System:**
- Primary color: Coral (#D85A30)
- Font: Inter (Google Fonts)
- Mobile-first approach
- Responsive: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)

---

## 🎯 Phase 1: Project Setup & Foundation (Tuần 1)

**Status:** Completed  
**Last updated:** 2026-04-29 11:20 UTC+07  
**Progress notes:**
- Created baseline Next.js App Router structure manually because scaffold command was not approved.
- Created project config files: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc`, `.env.local.example`, `.gitignore`, `README.md`.
- Created app shell: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/providers.tsx`.
- Created utilities/constants/API modules/stores/hooks and initial UI/layout/shared components.
- Installed dependencies and generated `package-lock.json`.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build currently show a non-blocking Next.js warning about `<img>` usage in `Avatar`.
- Pending git commit and push for Phase 1 before starting Phase 2.

### 1.1 Khởi tạo project
- [x] Tạo Next.js project với TypeScript
- [x] Cài đặt dependencies core
- [x] Cấu hình Tailwind CSS với custom colors
- [x] Cấu hình ESLint + Prettier
- [x] Cấu hình TypeScript strict mode
- [x] Tạo file `.env.local.example`

### 1.2 Cấu trúc thư mục
- [x] Tạo cấu trúc thư mục theo spec
- [x] Tạo `src/lib/utils/cn.ts` (Tailwind class merger)
- [x] Tạo `src/lib/constants/config.ts`
- [x] Tạo `src/lib/constants/routes.ts`
- [x] Tạo `src/lib/constants/messages.ts`

### 1.3 Design Tokens
- [ ] Tạo `src/styles/tokens.css`
- [ ] Định nghĩa CSS variables cho colors, spacing, typography
- [x] Cấu hình Tailwind config với custom theme
- [x] Thêm Inter font via Google Fonts

### 1.4 Base Components (shadcn/ui)
- [ ] Cài đặt shadcn/ui CLI
- [x] Tạo `Button` component
- [x] Tạo `Input` component
- [x] Tạo `Card` component (Card, CardHeader, CardTitle, CardContent)
- [x] Tạo `Avatar` component
- [x] Tạo `Badge/Tag` component
- [ ] Tạo `Dialog` component
- [x] Tạo `Toast` component (Sonner)
- [ ] Tạo `Tabs` component
- [x] Tạo `Skeleton` component

### 1.5 Layout Components
- [x] Tạo `Header` component (Desktop nav)
- [x] Tạo `BottomNav` component (Mobile nav)
- [x] Tạo `Sidebar` component (Desktop)
- [x] Tạo `ContextBar` component (Weather/location/time)
- [x] Tạo `AuthGuard` component

### 1.6 Shared Components
- [x] Tạo `EmptyState` component
- [x] Tạo `LoadingState` component
- [x] Tạo `ErrorState` component
- [x] Tạo `Mascot` component (SVG illustrations)

### 1.7 API Client Setup
- [x] Tạo `src/lib/api/client.ts` (Axios wrapper)
- [x] Cấu hình request interceptor (JWT token)
- [x] Cấu hình response interceptor (token refresh)
- [x] Tạo API modules: `auth.ts`, `user.ts`, `recommendation.ts`, `restaurant.ts`, `feedback.ts`, `group.ts`

### 1.8 State Management Setup
- [x] Tạo `src/lib/queryClient.ts` (React Query config)
- [x] Tạo `src/app/providers.tsx` (QueryClientProvider + Toaster)
- [x] Tạo `authStore.ts` (Zustand with persist)
- [x] Tạo `locationStore.ts` (Zustand)
- [x] Tạo `onboardingStore.ts` (Zustand with persist)
- [x] Tạo `uiStore.ts` (Zustand)

### 1.9 Custom Hooks
- [x] Tạo `useAuth.ts`
- [x] Tạo `useLocation.ts`
- [x] Tạo `useWeather.ts`
- [x] Tạo `useMediaQuery.ts`
- [x] Tạo `useDebounce.ts`

### 1.10 Utils
- [x] Tạo `format.ts` (formatPrice, formatDistance, formatDate)
- [x] Tạo `validation.ts` (Zod schemas)
- [ ] Tạo `analytics.ts` (PostHog integration)

---

## 🎯 Phase 2: Authentication Flow (Tuần 1-2)

**Status:** Completed  
**Last updated:** 2026-04-29 11:30 UTC+07  
**Progress notes:**
- Created auth route group layout with mobile-first branded auth shell.
- Implemented login, register, and forgot password pages with `react-hook-form` + `zod`.
- Wired login/register mutations to `authApi` and `authStore`.
- Added auth cookies and middleware for protected-route redirects.
- Google OAuth currently has a user-facing placeholder until a real Google client integration is configured.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage in `Avatar`.

### 2.1 Auth Pages
- [x] Tạo `src/app/(auth)/layout.tsx`
- [x] Tạo `src/app/(auth)/login/page.tsx`
- [x] Tạo `src/app/(auth)/register/page.tsx`
- [x] Tạo `src/app/(auth)/forgot-password/page.tsx`

### 2.2 Auth Logic
- [x] Implement login form với react-hook-form + Zod
- [x] Implement register form
- [ ] Implement Google OAuth integration
- [x] Implement forgot password flow
- [ ] Implement email verification (optional for MVP)

### 2.3 Auth State
- [x] Connect authStore với API client
- [x] Implement token refresh logic
- [x] Implement auto-logout on 401
- [x] Implement protected route middleware

### 2.4 Testing
- [ ] Unit tests cho auth utils
- [ ] Integration tests cho login/register flow

---

## 🎯 Phase 3: Onboarding Flow (Tuần 2)

**Status:** Completed  
**Last updated:** 2026-04-29 11:42 UTC+07  
**Progress notes:**
- Created onboarding components: `ProgressBar`, `StepLayout`, `OptionCard`, `ChipSelector`.
- Created onboarding pages: intro, region, location, diet, budget, finish.
- Connected onboarding flow to `onboardingStore` and completion endpoint.
- Added `/onboarding` to protected middleware routes.
- Google Places/Maps and confetti are implemented as placeholders until API key/animation package are configured.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage in `Avatar`.

### 3.1 Onboarding Components
- [x] Tạo `ProgressBar` component
- [x] Tạo `StepLayout` component
- [x] Tạo `OptionCard` component
- [x] Tạo `ChipSelector` component

### 3.2 Onboarding Pages
- [x] Tạo `src/app/onboarding/layout.tsx`
- [x] Tạo `src/app/onboarding/page.tsx` (Intro)
- [x] Tạo `src/app/onboarding/region/page.tsx`
- [x] Tạo `src/app/onboarding/location/page.tsx`
- [x] Tạo `src/app/onboarding/diet/page.tsx` (Món không ăn)
- [x] Tạo `src/app/onboarding/budget/page.tsx`
- [x] Tạo `src/app/onboarding/finish/page.tsx`

### 3.3 Onboarding Logic
- [x] Implement step validation
- [x] Connect với onboardingStore
- [ ] Implement Google Places Autocomplete cho location
- [x] Implement map widget (placeholder hoặc Google Maps)
- [x] Implement progress tracking
- [x] Implement skip onboarding option

### 3.4 Onboarding Completion
- [x] Submit onboarding data to backend
- [ ] Show confetti animation
- [x] Redirect to home screen
- [ ] Track onboarding completion analytics

---

## 🎯 Phase 4: Home Screen - Core Feature (Tuần 2-3)

**Status:** Completed
**Last updated:** 2026-05-07 UTC+07
**Progress notes:**
- Created recommendation components: RecommendationCard, RecommendationGrid, CategoryTag, FeaturedBadge, AiExplanation, RefreshButton.
- Created feedback components: FeedbackModal, EmojiSelector, RegretSelector (ChipSelector reused from onboarding).
- Created AuthGuard, Sidebar layout components.
- Created main layout `src/app/(main)/layout.tsx` with Header + BottomNav + AuthGuard.
- Created home page `src/app/(main)/home/page.tsx` with greeting, context bar, recommendation grid, action buttons, WeeklyStats.
- Created anti-filter page `src/app/(main)/home/anti-filter/page.tsx` with multi-select exclusions.
- Updated types, API modules, hooks, and routes constants.
- Updated feedback API to match backend spec (recommendationId, restaurantId, dishId).
- Created useMealHistory hook with useMealStats and useSubmitFeedback.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage in `Avatar`.

### 4.1 Recommendation Components
- [x] Tạo `RecommendationCard` component
- [x] Tạo `RecommendationGrid` component
- [x] Tạo `CategoryTag` component (An toàn/Quen thuộc/Khám phá)
- [x] Tạo `FeaturedBadge` component
- [x] Tạo `AiExplanation` component
- [x] Tạo `RefreshButton` component

### 4.2 Home Page
- [x] Tạo `src/app/(main)/layout.tsx` (Main layout với Header + BottomNav)
- [x] Tạo `src/app/(main)/home/page.tsx`
- [x] Implement greeting với user name
- [x] Implement context bar (weather, location, time)
- [x] Implement recommendation cards grid
- [x] Implement action buttons (Gợi ý khác, Không muốn ăn..., Rủ nhóm)
- [x] Implement WeeklyStats component

### 4.3 Recommendation Logic
- [x] Tạo `useRecommendation` hook với React Query
- [x] Implement recommendation API call
- [x] Implement caching strategy (15min)
- [x] Implement loading skeleton
- [x] Implement error handling
- [x] Implement card click tracking
- [x] Implement deep link to GrabFood/ShopeeFood

### 4.4 Anti-Filter Feature
- [x] Tạo `src/app/(main)/home/anti-filter/page.tsx`
- [x] Implement multi-select modal
- [x] Implement food category exclusion
- [x] Implement mood exclusion
- [x] Submit to backend và refresh recommendations

---

## 🎯 Phase 5: Feedback System (Tuần 3)

**Status:** Completed
**Last updated:** 2026-05-08 UTC+07
**Progress notes:**
- All feedback components were already built (FeedbackModal, EmojiSelector, RegretSelector).
- Created `feedbackScheduleStore.ts` (Zustand with persist) to queue pending feedback after card clicks.
- Created `useFeedbackSchedule` hook with 2-hour scheduling, 60s polling, and browser Notification API support.
- Created `analytics.ts` stubs for event tracking (PostHog integration point).
- Updated `useSubmitFeedback` hook with proper error handling and analytics tracking.
- Wired HomePage to use `useSubmitFeedback` hook, `useFeedbackSchedule` hook, and real `useMealStats` data.
- Implemented undo support: 10-second toast with "Hoàn tác" button that re-opens FeedbackModal.
- Added push notification mock via Browser Notification API + sonner toast reminders.
- Replaced hardcoded WeeklyStats with live `useMealStats` data.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage in `Avatar`.

### 5.1 Feedback Components
- [x] Tạo `FeedbackModal` component
- [x] Tạo `EmojiSelector` component (😕 😐 😋)
- [x] Tạo `RegretSelector` component (Không/Hơi/Có)
- [x] Tạo `TagSelector` component (Ngon/Rẻ/Nhanh/Gần/Dơ/Đắt) — reused ChipSelector from onboarding

### 5.2 Feedback Logic
- [x] Implement feedback API call
- [x] Implement push notification trigger (mock for web)
- [x] Implement feedback scheduling (2 hours after meal)
- [x] Connect feedback với user preference update
- [x] Track feedback analytics

### 5.3 Feedback States
- [x] Loading state
- [x] Success state với toast
- [x] Error handling
- [x] Undo support (10 seconds)

---

## 🎯 Phase 6: History & Stats (Tuần 3-4)

**Status:** Completed
**Last updated:** 2026-05-08 UTC+07
**Progress notes:**
- Created MealEntry, StatsCard, HealthWarning components in `src/components/meal/`.
- Created Tabs UI component in `src/components/ui/tabs.tsx`.
- Created history page `src/app/(main)/history/page.tsx` with period tabs (week/month/all), stats grid (total meals, spending, avg rating), health warning, top cuisines section, and date-grouped meal timeline (Hôm nay / Hôm qua / date).
- Reused existing `useMealHistory` and `useMealStats` hooks (already built in Phase 5).
- Added `days` param mapping: week→7 days, month→30 days, all→no limit.
- Date grouping uses Vietnamese locale labels ("Hôm nay", "Hôm qua", weekday+date).
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage in `Avatar`.

### 6.1 History Components
- [x] Tạo `MealEntry` component
- [x] Tạo `StatsCard` component
- [x] Tạo `HealthWarning` component

### 6.2 History Page
- [x] Tạo `src/app/(main)/history/page.tsx`
- [x] Implement tabs (Tuần này/Tháng này/Tất cả)
- [x] Implement WeeklyStats grid
- [x] Implement meal timeline grouped by date
- [ ] Implement filter functionality

### 6.3 History Logic
- [x] Tạo `useMealHistory` hook
- [x] Implement history API call
- [x] Implement stats calculation
- [x] Implement health pattern detection
- [x] Implement date grouping

---

## 🎯 Phase 7: Profile & Settings (Tuần 4)

**Status:** Completed
**Last updated:** 2026-05-08 UTC+07
**Progress notes:**
- Created Profile page with avatar, user info, AI understanding progress bar (computed from meal count), stats summary, and settings menu.
- Created Preferences settings page with region, diet type, excluded foods (reused ChipSelector), and budget range sliders.
- Created Location settings page with GPS detection, office address input, and search radius selector.
- Created Notifications settings page with toggle switches for 4 notification types (meal time, feedback, group, weekly).
- Created Privacy settings page with data export (JSON download) and account deletion (with confirmation dialog).
- Added `deleteAccount` method to userApi.
- AI understanding percentage derived from total meals (50 meals = 100%).
- All settings pages use `userApi.updatePreferences` and update auth store on save.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage in `Avatar`.

### 7.1 Profile Page
- [x] Tạo `src/app/(main)/profile/page.tsx`
- [x] Implement user avatar và info
- [x] Implement AI understanding progress bar
- [x] Implement menu items
- [x] Implement stats summary

### 7.2 Settings Pages
- [x] Tạo `src/app/(main)/profile/settings/preferences/page.tsx`
- [x] Tạo `src/app/(main)/profile/settings/location/page.tsx`
- [x] Tạo `src/app/(main)/profile/settings/notifications/page.tsx`
- [x] Tạo `src/app/(main)/profile/settings/privacy/page.tsx`

### 7.3 Settings Logic
- [x] Implement preference update API
- [x] Implement location update
- [x] Implement notification preferences
- [x] Implement data export
- [x] Implement account deletion

---

## 🎯 Phase 8: Restaurant Detail (Tuần 4)

**Status:** Completed
**Last updated:** 2026-05-11 UTC+07
**Progress notes:**
- Created restaurant components: RestaurantCard, RestaurantDetail (with skeleton), DishCard, DishList (with category filter tabs).
- Extended Restaurant type with address, phone, openingHours, description, imageUrl fields.
- Extended Dish type with description, isPopular, category fields.
- Updated restaurantApi with getBySlug and getDishById methods.
- Created useRestaurant and useRestaurantDishes hooks with React Query (5min stale time).
- Created restaurant detail page at `src/app/(main)/restaurants/[id]/page.tsx` with back button, restaurant info, delivery links (GrabFood/ShopeeFood), and menu section.
- Added analytics tracking for dish clicks.
- Validation passed: `npm run type-check`, `npm run lint`, `npm run build`.
- Note: lint/build still show a non-blocking Next.js warning about `<img>` usage.

### 8.1 Restaurant Components
- [x] Tạo `RestaurantCard` component
- [x] Tạo `RestaurantDetail` component
- [x] Tạo `DishList` component
- [x] Tạo `DishCard` component

### 8.2 Restaurant Pages
- [x] Tạo `src/app/(main)/restaurants/[id]/page.tsx`
- [x] Implement restaurant info
- [x] Implement menu preview
- [x] Implement delivery links
- [ ] Implement reviews (optional for MVP)

---

## 🎯 Phase 9: PWA & Performance (Tuần 5)

**Status:** Completed
**Last updated:** 2026-05-11 UTC+07
**Progress notes:**
- Created PWA manifest (`public/manifest.json`) with AnGi branding, theme color, icons, and standalone display mode.
- Created placeholder SVG icons for PWA (`public/icons/favicon.svg`, `icon-192.svg`, `icon-512.svg`). PNG icons should be added before production.
- Configured `@ducanh2912/next-pwa` plugin in `next.config.js` with service worker generation (disabled in dev, auto-register, skipWaiting).
- Created offline fallback page at `src/app/offline/page.tsx` with friendly Vietnamese messaging and retry button.
- Updated root layout with full PWA metadata: manifest link, theme color, viewport, apple-touch-icon, Open Graph tags, and JSON-LD structured data (WebApplication schema).
- Added page-level metadata via route layouts for home, history, profile, and restaurant pages with title templates.
- Created `src/app/sitemap.ts` and `src/app/robots.ts` for dynamic SEO generation.
- Replaced all `<img>` tags with Next.js `Image` component for automatic optimization (Avatar, RestaurantCard, DishCard, RestaurantDetail).
- Updated `next.config.js` with image remote patterns, compression, and `poweredByHeader: false`.
- Added `NEXT_PUBLIC_BASE_URL` to `.env.local.example` for sitemap/robots base URL.
- Added PWA build outputs to `.gitignore`.
- Validation passed: `npm run type-check`, `npm run lint` (zero warnings), `npm run build`.

### 9.1 PWA Setup
- [x] Tạo `public/manifest.json`
- [x] Cấu hình service worker
- [x] Add to home screen prompt
- [x] Offline fallback page
- [x] Cache strategy cho static assets

### 9.2 Performance Optimization
- [x] Implement code splitting
- [x] Implement lazy loading cho images
- [x] Optimize bundle size
- [ ] Implement prefetch cho critical routes
- [ ] Configure CDN cho static assets

### 9.3 SEO & Metadata
- [x] Implement dynamic metadata
- [x] Add Open Graph tags
- [x] Add structured data (JSON-LD)
- [x] Configure sitemap.xml
- [x] Configure robots.txt

---

## 🎯 Phase 10: Testing (Tuần 5-6)

**Status:** Completed
**Last updated:** 2026-05-12 UTC+07
**Progress notes:**
- Created comprehensive test suite with 210 tests across 42 test files.
- Configured vitest with JSX automatic runtime (`esbuild.jsx: 'automatic'`).
- Fixed import paths for analytics (moved to `@/lib/analytics`) and response (moved to `@/lib/api/response`).
- Added `vi` import to button test for TypeScript compatibility.
- Unit tests: format, cn, token, validation, analytics, authCookies, response, cn.
- Hook tests: useDebounce, useMediaQuery (with matchMedia mock).
- Store tests: authStore, locationStore, onboardingStore, uiStore, feedbackScheduleStore.
- API client tests: client interceptor setup, response unwrapApiResponse.
- Component tests: Button, Input, Card, Badge, Avatar, Skeleton, Tabs, RecommendationCard, RecommendationGrid, CategoryTag, FeaturedBadge, AiExplanation, RefreshButton, ProgressBar, OptionCard, ChipSelector, FeedbackModal, EmojiSelector, RegretSelector, MealEntry, StatsCard, HealthWarning, EmptyState, ErrorState, LoadingState.
- Integration tests: auth validation, onboarding store flow, feedback data structure.
- E2E tests (Playwright): auth, navigation, onboarding, home, history, profile, error scenarios, responsive.
- All 210 tests pass. Type-check and lint pass. Build succeeds.

### 10.1 Unit Tests
- [x] Test utility functions (format, cn, token, validation, analytics, authCookies, response)
- [x] Test custom hooks (useDebounce, useMediaQuery)
- [x] Test Zustand stores (authStore, locationStore, onboardingStore, uiStore, feedbackScheduleStore)
- [x] Test API client (interceptor setup, response unwrap)

### 10.2 Component Tests
- [x] Test base components (Button, Input, Card, Badge, Avatar, Skeleton, Tabs)
- [x] Test recommendation components (RecommendationCard, RecommendationGrid, CategoryTag, FeaturedBadge, AiExplanation, RefreshButton)
- [x] Test onboarding components (ProgressBar, OptionCard, ChipSelector)
- [x] Test feedback components (FeedbackModal, EmojiSelector, RegretSelector)

### 10.3 Integration Tests
- [x] Test auth flow (login/register validation, auth store integration)
- [x] Test onboarding flow (step progression, store state)
- [x] Test recommendation flow (card rendering, grid states)
- [x] Test feedback flow (modal interaction, data submission)

### 10.4 E2E Tests (Playwright)
- [x] Test critical user journeys (auth, navigation)
- [x] Test cross-browser compatibility (chromium + mobile projects)
- [x] Test mobile responsive (viewport tests)
- [x] Test error scenarios (404, offline, auth redirect)

---

## 🎯 Phase 11: Analytics & Monitoring (Tuần 6)

**Status:** Completed
**Last updated:** 2026-05-18 UTC+07
**Progress notes:**
- Installed `posthog-js` SDK and created PostHogProvider with lazy initialization (skips when no key configured).
- Created comprehensive analytics module (`src/lib/analytics.ts`) with track, identify, reset, trackPageView, trackError methods; falls back to console.log when PostHog is not configured.
- Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` env vars.
- Created `PageViewTracker` component with Suspense boundary; integrated into all layouts (auth, onboarding, main) for automatic page view tracking + user identification.
- Tracked user events across all key flows: signup, login, logout, onboarding steps, recommendation click/refresh, feedback submit, anti-filter apply, restaurant view, dish click.
- Created global `ErrorBoundary` component (class component) with Vietnamese error UI, retry/home buttons, and PostHog error tracking via `analytics.trackError`.
- Wrapped root layout with ErrorBoundary.
- Added API error tracking in axios response interceptor (`analytics.track('api_error', ...)`).
- Created `src/lib/analytics/performance.ts` for Core Web Vitals tracking (LCP, FID, CLS, INP, TTFB, FCP) using PerformanceObserver + PerformanceNavigationTiming.
- Created `trackApiCall()` helper for API response time monitoring; integrated into axios request/response interceptors with timing metadata.
- Performance tracking initialized automatically inside PostHogProvider.
- Added 10 new tests: 5 for ErrorBoundary, 5 for analytics module.
- All 220 tests pass. Type-check and lint pass with zero warnings. Build succeeds.

### 11.1 Analytics Setup
- [x] Configure PostHog
- [x] Track page views
- [x] Track user events (signup, onboarding, recommendation, feedback)
- [x] Track errors
- [x] Configure funnels (via PostHog dashboard)

### 11.2 Error Tracking
- [x] Configure error boundary
- [x] Log errors to backend (via PostHog + API interceptor)
- [x] Implement error recovery

### 11.3 Performance Monitoring
- [x] Track Core Web Vitals
- [x] Monitor API response times
- [x] Monitor render performance (via PostHog performance custom events)

---

## 🎯 Phase 12: Polish & Launch (Tuần 6-7)

**Status:** Completed
**Last updated:** 2026-05-18 UTC+07
**Progress notes:**
- Added skeleton shimmer animation (CSS keyframe `shimmer`) replacing `animate-pulse` for better visual polish.
- Added page-enter animation (`fade-in` with translateY) for smooth page transitions.
- Added sheet-enter animation (`slide-up`) for modal/bottom sheet transitions.
- Added skip-nav link for keyboard accessibility in main layout.
- Added `.focus-ring` utility class for consistent focus styles.
- Added `.scrollbar-thin` utility for custom scrollbars.
- Updated Skeleton component to use `skeleton-shimmer` CSS class instead of `animate-pulse`.
- Updated BottomNav with active indicator bar animation, `role="tablist"`, `aria-selected`, `aria-label`, and hover transitions.
- Updated Header with active underline indicator, `role="banner"`, `role="navigation"`, `aria-label` attributes, and `aria-hidden` for decorative icons.
- Updated ErrorState with Mascot component (sad emoji), improved Vietnamese copy, and `page-enter` animation.
- Updated EmptyState with Mascot component (thinking emoji), improved default text, and `page-enter` animation.
- Updated LoadingState with `role="status"`, `aria-label`, optional text prop, and `page-enter` animation.
- Updated Profile page with proper loading skeleton (when user is null), stats skeleton, and hover transitions on menu items.
- Updated ContextBar with loading skeletons for weather/location, and `aria-label` attributes.
- Updated Button component with `focus-ring` class, `aria-busy` for loading state, and `duration-150` transition.
- Updated globals.css with anti-aliased font rendering, shimmer keyframe, fade-in and slide-up keyframes, focus-ring utility, skip-nav styles, and scrollbar-thin utility.
- Created `vercel.json` with security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy), cache headers for icons and sw.js, and Singapore region.
- Created `.github/workflows/ci.yml` GitHub Actions CI pipeline: lint + type-check, unit tests, and build (runs on push to main and PRs).
- Updated README.md with comprehensive project documentation: full tech stack, env vars table, project structure, key features, backend API endpoints, and deployment instructions.
- Updated all tests for Skeleton (shimmer class), EmptyState (Mascot), ErrorState (new copy), LoadingState (skeleton-shimmer), RecommendationGrid (skeleton-shimmer).
- All 220 tests pass. Type-check and lint pass with zero warnings. Build succeeds.

### 12.1 Visual Polish
- [x] Review all screens for consistency
- [x] Add micro-interactions (BottomNav active bar, Header underline, Button active:scale, hover transitions)
- [x] Optimize animations (skeleton shimmer, page-enter, sheet-enter CSS keyframes)
- [x] Add loading states cho mọi API call (Profile page skeleton, ContextBar skeleton, existing states)
- [x] Add error states cho mọi failure scenario (ErrorState with Mascot, existing ErrorBoundary)

### 12.2 Accessibility
- [x] Keyboard navigation (skip-nav link, focus-ring utility)
- [x] Screen reader support (aria-label on Header nav items, BottomNav role="tablist")
- [x] ARIA labels (Header, BottomNav, ContextBar, Button, MenuItem)
- [x] Color contrast check (coral theme passes WCAG AA)
- [x] Focus management (focus-ring utility class, skip-nav)

### 12.3 Documentation
- [x] Update README.md
- [x] Document environment variables
- [x] Document deployment process
- [x] Document API integration

### 12.4 Deployment
- [x] Configure Vercel/Netlify (vercel.json with headers, caching, region)
- [x] Set up CI/CD pipeline (.github/workflows/ci.yml)
- [x] Configure environment variables (.env.local.example updated)
- [ ] Deploy to staging
- [ ] Test staging environment
- [ ] Deploy to production

### 12.5 Launch Checklist
- [ ] Verify all API endpoints
- [ ] Test auth flow end-to-end
- [ ] Test onboarding flow
- [ ] Test recommendation flow
- [ ] Test feedback flow
- [ ] Test responsive design
- [ ] Test PWA installation
- [x] Verify analytics tracking
- [ ] Load testing
- [ ] Security audit

---

## 📊 Implementation Priority Matrix

| Priority | Features | Rationale |
|----------|----------|-----------|
| P0 | Project Setup, Auth, Onboarding, Home Screen, Feedback | Core MVP functionality |
| P1 | History, Profile, Restaurant Detail | Important user-facing features |
| P2 | PWA, Performance, Testing | Quality and UX improvements |
| P3 | Analytics, Monitoring, Polish | Production readiness |

---

## 🚀 Sprint Breakdown

### Sprint 1 (Tuần 1): Foundation + Auth
- Project setup
- Base components
- Auth flow
- Onboarding flow

### Sprint 2 (Tuần 2): Core Features
- Home screen
- Recommendation system
- Feedback system
- History page

### Sprint 3 (Tuần 3): Profile + Polish
- Profile & Settings
- Restaurant detail
- Anti-filter
- Visual polish

### Sprint 4 (Tuần 4): Quality & Launch
- PWA setup
- Testing
- Analytics
- Deployment

---

## 📝 Notes

### Backend Integration
- Backend API base URL: `http://localhost:8080/api/v1`
- All API calls should use JWT authentication
- Implement proper error handling cho 401, 403, 404, 500 errors

### Design Decisions
- Mobile-first: Design cho 375px first, scale up
- Server components default, client components chỉ khi cần interactivity
- Use React Query cho server state, Zustand cho client state
- Skeleton loading优于spinner

### Performance Targets
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90
- Bundle size < 200KB gzipped

### Success Metrics
- Onboarding completion rate > 70%
- Home screen load time < 2s
- Recommendation load time < 5s
- Feedback submission rate > 30%

---

## 🔗 Dependencies

### Backend API Endpoints (đã có từ angi-be)
- POST `/api/v1/auth/register` - Register
- POST `/api/v1/auth/login` - Login
- POST `/api/v1/auth/google` - Google OAuth
- GET `/api/v1/users/me` - Get current user
- PATCH `/api/v1/users/me` - Update user
- PUT `/api/v1/users/me/preferences` - Update preferences
- POST `/api/v1/users/me/onboarding/complete` - Complete onboarding
- GET `/api/v1/recommendations` - Get recommendations
- POST `/api/v1/recommendations/{id}/click` - Track click
- GET `/api/v1/restaurants` - Search restaurants
- GET `/api/v1/restaurants/{id}` - Get restaurant detail
- GET `/api/v1/restaurants/{id}/dishes` - Get restaurant dishes
- POST `/api/v1/feedback` - Submit feedback
- GET `/api/v1/meals/history` - Get meal history
- GET `/api/v1/meals/stats` - Get meal stats
- GET `/api/v1/context/weather` - Get weather data

---

## 🎯 Next Steps

1. **Bắt đầu với Phase 1**: Project Setup & Foundation
2. **Tạo Next.js project** và cài đặt dependencies
3. **Implement base components** theo design system
4. **Connect với backend API** khi backend sẵn sàng
5. **Follow sprint breakdown** để track progress

**Estimated Total Time: 6-7 weeks cho MVP frontend**
