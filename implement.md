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

**Status:** In Progress  
**Last updated:** 2026-04-29 11:10 UTC+07  
**Progress notes:**
- Created baseline Next.js App Router structure manually because scaffold command was not approved.
- Created project config files: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`, `.prettierrc`, `.env.local.example`, `.gitignore`, `README.md`.
- Created app shell: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `src/app/providers.tsx`.
- Created utilities/constants/API modules/stores/hooks and initial UI/layout/shared components.
- Pending dependency installation and validation because `npm install` was not approved yet.
- Pending git commit and push after validation succeeds.

### 1.1 Khởi tạo project
- [x] Tạo Next.js project với TypeScript
- [ ] Cài đặt dependencies core
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
- [ ] Tạo `Sidebar` component (Desktop)
- [x] Tạo `ContextBar` component (Weather/location/time)
- [ ] Tạo `AuthGuard` component

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
- [ ] Tạo `validation.ts` (Zod schemas)
- [ ] Tạo `analytics.ts` (PostHog integration)

---

## 🎯 Phase 2: Authentication Flow (Tuần 1-2)

### 2.1 Auth Pages
- [ ] Tạo `src/app/(auth)/layout.tsx`
- [ ] Tạo `src/app/(auth)/login/page.tsx`
- [ ] Tạo `src/app/(auth)/register/page.tsx`
- [ ] Tạo `src/app/(auth)/forgot-password/page.tsx`

### 2.2 Auth Logic
- [ ] Implement login form với react-hook-form + Zod
- [ ] Implement register form
- [ ] Implement Google OAuth integration
- [ ] Implement forgot password flow
- [ ] Implement email verification (optional for MVP)

### 2.3 Auth State
- [ ] Connect authStore với API client
- [ ] Implement token refresh logic
- [ ] Implement auto-logout on 401
- [ ] Implement protected route middleware

### 2.4 Testing
- [ ] Unit tests cho auth utils
- [ ] Integration tests cho login/register flow

---

## 🎯 Phase 3: Onboarding Flow (Tuần 2)

### 3.1 Onboarding Components
- [ ] Tạo `ProgressBar` component
- [ ] Tạo `StepLayout` component
- [ ] Tạo `OptionCard` component
- [ ] Tạo `ChipSelector` component

### 3.2 Onboarding Pages
- [ ] Tạo `src/app/onboarding/layout.tsx`
- [ ] Tạo `src/app/onboarding/page.tsx` (Intro)
- [ ] Tạo `src/app/onboarding/region/page.tsx`
- [ ] Tạo `src/app/onboarding/location/page.tsx`
- [ ] Tạo `src/app/onboarding/diet/page.tsx` (Món không ăn)
- [ ] Tạo `src/app/onboarding/budget/page.tsx`
- [ ] Tạo `src/app/onboarding/finish/page.tsx`

### 3.3 Onboarding Logic
- [ ] Implement step validation
- [ ] Connect với onboardingStore
- [ ] Implement Google Places Autocomplete cho location
- [ ] Implement map widget (placeholder hoặc Google Maps)
- [ ] Implement progress tracking
- [ ] Implement skip onboarding option

### 3.4 Onboarding Completion
- [ ] Submit onboarding data to backend
- [ ] Show confetti animation
- [ ] Redirect to home screen
- [ ] Track onboarding completion analytics

---

## 🎯 Phase 4: Home Screen - Core Feature (Tuần 2-3)

### 4.1 Recommendation Components
- [ ] Tạo `RecommendationCard` component
- [ ] Tạo `RecommendationGrid` component
- [ ] Tạo `CategoryTag` component (An toàn/Quen thuộc/Khám phá)
- [ ] Tạo `FeaturedBadge` component
- [ ] Tạo `AiExplanation` component
- [ ] Tạo `RefreshButton` component

### 4.2 Home Page
- [ ] Tạo `src/app/(main)/layout.tsx` (Main layout với Header + BottomNav)
- [ ] Tạo `src/app/(main)/home/page.tsx`
- [ ] Implement greeting với user name
- [ ] Implement context bar (weather, location, time)
- [ ] Implement recommendation cards grid
- [ ] Implement action buttons (Gợi ý khác, Không muốn ăn..., Rủ nhóm)
- [ ] Implement WeeklyStats component

### 4.3 Recommendation Logic
- [ ] Tạo `useRecommendation` hook với React Query
- [ ] Implement recommendation API call
- [ ] Implement caching strategy (15min)
- [ ] Implement loading skeleton
- [ ] Implement error handling
- [ ] Implement card click tracking
- [ ] Implement deep link to GrabFood/ShopeeFood

### 4.4 Anti-Filter Feature
- [ ] Tạo `src/app/(main)/home/anti-filter/page.tsx`
- [ ] Implement multi-select modal
- [ ] Implement food category exclusion
- [ ] Implement mood exclusion
- [ ] Submit to backend và refresh recommendations

---

## 🎯 Phase 5: Feedback System (Tuần 3)

### 5.1 Feedback Components
- [ ] Tạo `FeedbackModal` component
- [ ] Tạo `EmojiSelector` component (😕 😐 😋)
- [ ] Tạo `RegretSelector` component (Không/Hơi/Có)
- [ ] Tạo `TagSelector` component (Ngon/Rẻ/Nhanh/Gần/Dơ/Đắt)

### 5.2 Feedback Logic
- [ ] Implement feedback API call
- [ ] Implement push notification trigger (mock for web)
- [ ] Implement feedback scheduling (2 hours after meal)
- [ ] Connect feedback với user preference update
- [ ] Track feedback analytics

### 5.3 Feedback States
- [ ] Loading state
- [ ] Success state với toast
- [ ] Error handling
- [ ] Undo support (10 seconds)

---

## 🎯 Phase 6: History & Stats (Tuần 3-4)

### 6.1 History Components
- [ ] Tạo `MealEntry` component
- [ ] Tạo `StatsCard` component
- [ ] Tạo `HealthWarning` component

### 6.2 History Page
- [ ] Tạo `src/app/(main)/history/page.tsx`
- [ ] Implement tabs (Tuần này/Tháng này/Tất cả)
- [ ] Implement WeeklyStats grid
- [ ] Implement meal timeline grouped by date
- [ ] Implement filter functionality

### 6.3 History Logic
- [ ] Tạo `useMealHistory` hook
- [ ] Implement history API call
- [ ] Implement stats calculation
- [ ] Implement health pattern detection
- [ ] Implement date grouping

---

## 🎯 Phase 7: Profile & Settings (Tuần 4)

### 7.1 Profile Page
- [ ] Tạo `src/app/(main)/profile/page.tsx`
- [ ] Implement user avatar và info
- [ ] Implement AI understanding progress bar
- [ ] Implement menu items
- [ ] Implement stats summary

### 7.2 Settings Pages
- [ ] Tạo `src/app/(main)/profile/settings/preferences/page.tsx`
- [ ] Tạo `src/app/(main)/profile/settings/location/page.tsx`
- [ ] Tạo `src/app/(main)/profile/settings/notifications/page.tsx`
- [ ] Tạo `src/app/(main)/profile/settings/privacy/page.tsx`

### 7.3 Settings Logic
- [ ] Implement preference update API
- [ ] Implement location update
- [ ] Implement notification preferences
- [ ] Implement data export
- [ ] Implement account deletion

---

## 🎯 Phase 8: Restaurant Detail (Tuần 4)

### 8.1 Restaurant Components
- [ ] Tạo `RestaurantCard` component
- [ ] Tạo `RestaurantDetail` component
- [ ] Tạo `DishList` component
- [ ] Tạo `DishCard` component

### 8.2 Restaurant Pages
- [ ] Tạo `src/app/(main)/restaurants/[id]/page.tsx`
- [ ] Implement restaurant info
- [ ] Implement menu preview
- [ ] Implement delivery links
- [ ] Implement reviews (optional for MVP)

---

## 🎯 Phase 9: PWA & Performance (Tuần 5)

### 9.1 PWA Setup
- [ ] Tạo `public/manifest.json`
- [ ] Cấu hình service worker
- [ ] Add to home screen prompt
- [ ] Offline fallback page
- [ ] Cache strategy cho static assets

### 9.2 Performance Optimization
- [ ] Implement code splitting
- [ ] Implement lazy loading cho images
- [ ] Optimize bundle size
- [ ] Implement prefetch cho critical routes
- [ ] Configure CDN cho static assets

### 9.3 SEO & Metadata
- [ ] Implement dynamic metadata
- [ ] Add Open Graph tags
- [ ] Add structured data (JSON-LD)
- [ ] Configure sitemap.xml
- [ ] Configure robots.txt

---

## 🎯 Phase 10: Testing (Tuần 5-6)

### 10.1 Unit Tests
- [ ] Test utility functions
- [ ] Test custom hooks
- [ ] Test Zustand stores
- [ ] Test API client

### 10.2 Component Tests
- [ ] Test base components (Button, Input, Card, etc.)
- [ ] Test recommendation components
- [ ] Test onboarding components
- [ ] Test feedback components

### 10.3 Integration Tests
- [ ] Test auth flow (login → home)
- [ ] Test onboarding flow
- [ ] Test recommendation flow
- [ ] Test feedback flow

### 10.4 E2E Tests (Playwright)
- [ ] Test critical user journeys
- [ ] Test cross-browser compatibility
- [ ] Test mobile responsive
- [ ] Test error scenarios

---

## 🎯 Phase 11: Analytics & Monitoring (Tuần 6)

### 11.1 Analytics Setup
- [ ] Configure PostHog
- [ ] Track page views
- [ ] Track user events (signup, onboarding, recommendation, feedback)
- [ ] Track errors
- [ ] Configure funnels

### 11.2 Error Tracking
- [ ] Configure error boundary
- [ ] Log errors to backend
- [ ] Implement error recovery

### 11.3 Performance Monitoring
- [ ] Track Core Web Vitals
- [ ] Monitor API response times
- [ ] Monitor render performance

---

## 🎯 Phase 12: Polish & Launch (Tuần 6-7)

### 12.1 Visual Polish
- [ ] Review all screens for consistency
- [ ] Add micro-interactions
- [ ] Optimize animations
- [ ] Add loading states cho mọi API call
- [ ] Add error states cho mọi failure scenario

### 12.2 Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] ARIA labels
- [ ] Color contrast check
- [ ] Focus management

### 12.3 Documentation
- [ ] Update README.md
- [ ] Document environment variables
- [ ] Document deployment process
- [ ] Document API integration

### 12.4 Deployment
- [ ] Configure Vercel/Netlify
- [ ] Set up CI/CD pipeline
- [ ] Configure environment variables
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
- [ ] Verify analytics tracking
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
