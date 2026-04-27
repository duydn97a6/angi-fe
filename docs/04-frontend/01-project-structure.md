# 01. Frontend Project Structure (Next.js)

## 📁 Cấu trúc thư mục

```
angi-web/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── README.md
│
├── public/
│   ├── icons/
│   ├── images/
│   │   ├── mascot/         (Các pose mascot)
│   │   └── illustrations/
│   ├── fonts/
│   └── manifest.json        (PWA manifest)
│
├── src/
│   ├── app/                 (Next.js App Router)
│   │   ├── layout.tsx       (Root layout)
│   │   ├── page.tsx         (Landing page)
│   │   ├── globals.css
│   │   │
│   │   ├── (auth)/          (Auth routes group)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (main)/          (Authenticated routes)
│   │   │   ├── layout.tsx   (With bottom nav / sidebar)
│   │   │   ├── home/
│   │   │   │   └── page.tsx (Home with 3 recommendations)
│   │   │   ├── groups/
│   │   │   │   ├── page.tsx (List groups)
│   │   │   │   ├── create/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx (Group detail / poll)
│   │   │   ├── history/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx
│   │   │   └── restaurants/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── onboarding/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx      (Intro)
│   │   │   ├── region/
│   │   │   ├── location/
│   │   │   ├── diet/
│   │   │   ├── budget/
│   │   │   └── finish/
│   │   │
│   │   └── api/              (API routes - proxy to backend)
│   │       └── [[...path]]/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/               (Primitive components - shadcn/ui based)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── layout/           (Layout components)
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ContextBar.tsx
│   │   │
│   │   ├── recommendation/   (Recommendation-specific)
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── RecommendationGrid.tsx
│   │   │   ├── CategoryTag.tsx
│   │   │   ├── FeaturedBadge.tsx
│   │   │   ├── AiExplanation.tsx
│   │   │   └── RefreshButton.tsx
│   │   │
│   │   ├── onboarding/
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── StepLayout.tsx
│   │   │   ├── OptionCard.tsx
│   │   │   └── ChipSelector.tsx
│   │   │
│   │   ├── feedback/
│   │   │   ├── FeedbackModal.tsx
│   │   │   ├── EmojiSelector.tsx
│   │   │   └── RegretSelector.tsx
│   │   │
│   │   ├── group/
│   │   │   ├── GroupCard.tsx
│   │   │   ├── PollCard.tsx
│   │   │   ├── VoteButton.tsx
│   │   │   ├── VoterAvatars.tsx
│   │   │   └── FairnessIndicator.tsx
│   │   │
│   │   ├── restaurant/
│   │   │   ├── RestaurantCard.tsx
│   │   │   ├── RestaurantDetail.tsx
│   │   │   └── DishList.tsx
│   │   │
│   │   └── shared/
│   │       ├── EmptyState.tsx
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── Mascot.tsx
│   │       └── AuthGuard.tsx
│   │
│   ├── lib/
│   │   ├── api/              (API client layer)
│   │   │   ├── client.ts     (Axios/Fetch wrapper)
│   │   │   ├── auth.ts
│   │   │   ├── user.ts
│   │   │   ├── recommendation.ts
│   │   │   ├── restaurant.ts
│   │   │   ├── feedback.ts
│   │   │   └── group.ts
│   │   │
│   │   ├── hooks/            (Custom React hooks)
│   │   │   ├── useAuth.ts
│   │   │   ├── useLocation.ts
│   │   │   ├── useWeather.ts
│   │   │   ├── useRecommendation.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── stores/           (Zustand stores)
│   │   │   ├── authStore.ts
│   │   │   ├── userStore.ts
│   │   │   ├── locationStore.ts
│   │   │   └── uiStore.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts         (Tailwind class merging)
│   │   │   ├── format.ts     (Format money, date, distance)
│   │   │   ├── validation.ts
│   │   │   └── analytics.ts
│   │   │
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── config.ts
│   │       └── messages.ts
│   │
│   ├── types/
│   │   ├── api.ts            (API types from OpenAPI)
│   │   ├── user.ts
│   │   ├── restaurant.ts
│   │   ├── recommendation.ts
│   │   └── index.ts
│   │
│   └── styles/
│       └── tokens.css        (Design tokens)
│
└── tests/
    ├── unit/
    └── e2e/
```

## 📦 package.json dependencies

```json
{
  "name": "angi-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",

    "tailwindcss": "^3.4.0",
    "tailwind-merge": "^2.2.0",
    "clsx": "^2.1.0",
    "class-variance-authority": "^0.7.0",

    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-tabs": "^1.0.4",

    "lucide-react": "^0.344.0",
    "framer-motion": "^11.0.0",

    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.20.0",

    "axios": "^1.6.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.0",

    "date-fns": "^3.3.0",
    "recharts": "^2.12.0",

    "@react-google-maps/api": "^2.19.0",

    "sonner": "^1.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",

    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0",

    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",

    "vitest": "^1.3.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@playwright/test": "^1.42.0",

    "msw": "^2.2.0"
  }
}
```

## ⚙️ Tailwind config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#FAECE7',
          100: '#F5C4B3',
          200: '#F0997B',
          400: '#D85A30',
          600: '#993C1D',
          800: '#712B13',
          900: '#4A1B0C',
        },
        amber: {
          50: '#FAEEDA',
          100: '#FAC775',
          200: '#EF9F27',
          400: '#BA7517',
          600: '#854F0B',
          800: '#633806',
        },
        greenie: {
          50: '#EAF3DE',
          200: '#97C459',
          400: '#639922',
          600: '#3B6D11',
          800: '#27500A',
        },
        purple: {
          50: '#EEEDFE',
          200: '#AFA9EC',
          400: '#7F77DD',
          600: '#534AB7',
          800: '#3C3489',
        },
        gray: {
          50: '#F9F9F7',
          100: '#F1EFE8',
          200: '#D3D1C7',
          400: '#888780',
          600: '#5F5E5A',
          800: '#2C2C2A',
          900: '#1A1A19',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'h1': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
        'h3': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0,0,0,0.05)',
        'sm': '0 2px 4px rgba(0,0,0,0.08)',
        'md': '0 4px 12px rgba(0,0,0,0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scale-in 150ms ease-out',
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

## 🎯 Coding conventions

### File naming
- Components: `PascalCase.tsx` (e.g., `RecommendationCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix
- Utils: `camelCase.ts`
- Types: `camelCase.ts`
- Routes (App Router): lowercase với dashes hoặc brackets

### Component structure
```tsx
'use client';  // Only if needed

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import type { Restaurant } from '@/types';

// Types first
interface RecommendationCardProps {
  restaurant: Restaurant;
  category: 'safe' | 'familiar' | 'discovery';
  isFeatured?: boolean;
  onClick?: (restaurant: Restaurant) => void;
}

// Component
export function RecommendationCard({
  restaurant,
  category,
  isFeatured = false,
  onClick,
}: RecommendationCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.(restaurant);
  };

  return (
    <div
      className={cn(
        'rounded-lg border border-gray-100 bg-white p-4',
        isFeatured && 'border-2 border-coral-400',
        isClicked && 'scale-98'
      )}
      onClick={handleClick}
    >
      {/* Content */}
    </div>
  );
}
```

### State management decision tree

1. **Form state**: `react-hook-form`
2. **Server state**: `@tanstack/react-query`
3. **Client global state**: `zustand`
4. **Local component state**: `useState`
5. **URL state**: Next.js search params

### API calls pattern

```typescript
// lib/api/recommendation.ts
import { apiClient } from './client';
import type { Recommendation } from '@/types';

export const recommendationApi = {
  get: async (params: { lat: number; lng: number }) => {
    const { data } = await apiClient.get<Recommendation>('/recommendations', { params });
    return data;
  },

  trackClick: async (id: string, index: number) => {
    await apiClient.post(`/recommendations/${id}/click`, { index });
  },
};

// lib/hooks/useRecommendation.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { recommendationApi } from '@/lib/api/recommendation';

export function useRecommendation(lat: number, lng: number) {
  return useQuery({
    queryKey: ['recommendation', lat, lng],
    queryFn: () => recommendationApi.get({ lat, lng }),
    staleTime: 15 * 60 * 1000,  // 15 min
    enabled: !!lat && !!lng,
  });
}
```

## 🌐 Environment variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-api-key
NEXT_PUBLIC_ANALYTICS_ID=your-posthog-key
NEXTAUTH_SECRET=your-random-secret
```

## 🔌 API client setup

```typescript
// lib/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/lib/stores/authStore';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: Add JWT token
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await useAuthStore.getState().refresh();
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
```

## 🎨 Layout strategy

### Mobile-first CSS
```tsx
// Default classes for mobile (< 768px)
<div className="p-4 grid grid-cols-1 gap-3">

// Tablet (768px+)
<div className="p-4 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">

// Desktop (1024px+)
<div className="p-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
```

### Navigation strategy
- Mobile (< 768px): Bottom navigation bar
- Desktop (≥ 768px): Top horizontal nav + optional sidebar

### Container widths
- Mobile: full width with 16px padding
- Tablet: full width with 24px padding  
- Desktop: max-w-6xl (1152px) centered with 32px padding

## 📱 PWA setup

```json
// public/manifest.json
{
  "name": "AnGi - AI gợi ý món ăn",
  "short_name": "AnGi",
  "description": "AI quyết định món ăn thay bạn",
  "start_url": "/home",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#D85A30",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```
