# 04. State Management

## 🗂 Strategy overview

Chúng ta dùng **3 layers** để quản lý state:

1. **React Query** (`@tanstack/react-query`): Server state (API data)
2. **Zustand**: Client global state (auth, preferences, UI)
3. **React useState**: Local component state

### Decision tree
```
Is this data from the server?
├─ Yes → React Query
└─ No:
    Is this shared across components?
    ├─ Yes → Zustand
    └─ No → useState
```

---

## 🔐 Auth Store (Zustand)

### File: `src/lib/stores/authStore.ts`

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '@/lib/api/auth';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Actions
  setAuth: (user: User, tokens: { accessToken: string; refreshToken: string }) => void;
  setUser: (user: User) => void;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: false,

      setAuth: (user, tokens) => set({
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isAuthenticated: true,
      }),

      setUser: (user) => set({ user }),

      refresh: async () => {
        const { refreshToken } = get();
        if (!refreshToken) throw new Error('No refresh token');

        const response = await authApi.refresh(refreshToken);
        set({ accessToken: response.accessToken });
      },

      logout: () => {
        authApi.logout().catch(() => {}); // Fire and forget
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'angi-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    }
  )
);
```

---

## 📍 Location Store

### File: `src/lib/stores/locationStore.ts`

```typescript
import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
  district?: string;
  address?: string;
  accuracy?: number;
  source: 'gps' | 'office' | 'manual';
}

interface LocationState {
  currentLocation: Location | null;
  isLoading: boolean;
  error: string | null;

  getCurrentLocation: () => Promise<void>;
  setManualLocation: (location: Omit<Location, 'source'>) => void;
  useOfficeLocation: (office: { lat: number; lng: number; address: string }) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  isLoading: false,
  error: null,

  getCurrentLocation: async () => {
    if (!navigator.geolocation) {
      set({ error: 'Trình duyệt không hỗ trợ định vị' });
      return;
    }

    set({ isLoading: true, error: null });

    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
              source: 'gps',
            },
            isLoading: false,
          });
          resolve();
        },
        (error) => {
          const messages: Record<number, string> = {
            1: 'Bạn đã từ chối quyền truy cập vị trí',
            2: 'Không thể xác định vị trí',
            3: 'Hết thời gian chờ',
          };
          set({
            error: messages[error.code] || 'Lỗi định vị',
            isLoading: false,
          });
          resolve();
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    });
  },

  setManualLocation: (location) => set({
    currentLocation: { ...location, source: 'manual' },
    error: null,
  }),

  useOfficeLocation: (office) => set({
    currentLocation: { ...office, source: 'office' },
    error: null,
  }),
}));
```

---

## 👋 Onboarding Store

### File: `src/lib/stores/onboardingStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingData {
  region?: 'north' | 'central' | 'south';
  office?: {
    lat: number;
    lng: number;
    address: string;
    radius: number;
  };
  excludedFoods?: string[];
  budgetMin?: number;
  budgetMax?: number;
  dietType?: 'normal' | 'vegetarian' | 'vegan' | 'healthy';
  favoriteCuisines?: string[];
}

interface OnboardingState extends OnboardingData {
  currentStep: number;

  setRegion: (region: 'north' | 'central' | 'south') => void;
  setLocation: (office: OnboardingData['office']) => void;
  setExcludedFoods: (foods: string[]) => void;
  setBudget: (min: number, max: number) => void;
  setDietType: (diet: OnboardingData['dietType']) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 1,

      setRegion: (region) => set({ region, currentStep: 2 }),
      setLocation: (office) => set({ office, currentStep: 3 }),
      setExcludedFoods: (foods) => set({ excludedFoods: foods, currentStep: 4 }),
      setBudget: (min, max) => set({ budgetMin: min, budgetMax: max, currentStep: 5 }),
      setDietType: (diet) => set({ dietType: diet }),
      reset: () => set({
        region: undefined,
        office: undefined,
        excludedFoods: undefined,
        budgetMin: undefined,
        budgetMax: undefined,
        dietType: undefined,
        favoriteCuisines: undefined,
        currentStep: 1,
      }),
    }),
    {
      name: 'angi-onboarding',
    }
  )
);
```

---

## 🎨 UI Store

### File: `src/lib/stores/uiStore.ts`

```typescript
import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isFeedbackModalOpen: boolean;
  currentFeedbackMealId: string | null;
  theme: 'light' | 'dark';

  toggleMobileMenu: () => void;
  openFeedbackModal: (mealId: string) => void;
  closeFeedbackModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isFeedbackModalOpen: false,
  currentFeedbackMealId: null,
  theme: 'light',

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  openFeedbackModal: (mealId) => set({
    isFeedbackModalOpen: true,
    currentFeedbackMealId: mealId,
  }),

  closeFeedbackModal: () => set({
    isFeedbackModalOpen: false,
    currentFeedbackMealId: null,
  }),

  setTheme: (theme) => set({ theme }),
}));
```

---

## 🔍 React Query setup

### File: `src/lib/queryClient.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1 minute default
      gcTime: 5 * 60 * 1000,        // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### File: `src/app/providers.tsx`

```tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" richColors />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
```

---

## 🪝 Custom Hooks

### useAuth

```typescript
// src/lib/hooks/useAuth.ts
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';

export function useAuth() {
  const router = useRouter();
  const store = useAuthStore();

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isHydrated: store.isHydrated,

    logout: () => {
      store.logout();
      router.push('/login');
    },
  };
}
```

### useRecommendation

```typescript
// src/lib/hooks/useRecommendation.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { recommendationApi } from '@/lib/api/recommendation';

export function useRecommendation(lat?: number, lng?: number) {
  return useQuery({
    queryKey: ['recommendation', lat, lng],
    queryFn: () => recommendationApi.get({ lat: lat!, lng: lng! }),
    staleTime: 15 * 60 * 1000,    // 15 minutes (matches backend cache)
    enabled: !!lat && !!lng,
  });
}

export function useRefreshRecommendation() {
  const queryClient = useQueryClient();
  return (lat: number, lng: number) => {
    queryClient.invalidateQueries({ queryKey: ['recommendation', lat, lng] });
  };
}
```

### useWeather

```typescript
// src/lib/hooks/useWeather.ts
import { useQuery } from '@tanstack/react-query';
import { useLocationStore } from '@/lib/stores/locationStore';
import { contextApi } from '@/lib/api/context';

export function useWeather() {
  const location = useLocationStore((s) => s.currentLocation);

  return useQuery({
    queryKey: ['weather', location?.lat, location?.lng],
    queryFn: () => contextApi.getWeather(location!.lat, location!.lng),
    enabled: !!location,
    staleTime: 60 * 60 * 1000,   // 1 hour
  });
}
```

### useLocation

```typescript
// src/lib/hooks/useLocation.ts
import { useEffect } from 'react';
import { useLocationStore } from '@/lib/stores/locationStore';
import { useAuth } from './useAuth';

export function useLocation() {
  const { user } = useAuth();
  const { currentLocation, isLoading, error, getCurrentLocation, useOfficeLocation } = useLocationStore();

  useEffect(() => {
    if (!currentLocation) {
      // Try GPS first
      getCurrentLocation().then(() => {
        // If failed and user has office location, fallback
        const state = useLocationStore.getState();
        if (state.error && user?.preferences?.officeLocation) {
          useOfficeLocation(user.preferences.officeLocation);
        }
      });
    }
  }, [user]);

  return {
    location: currentLocation,
    isLoading,
    error,
    refetch: getCurrentLocation,
  };
}
```

### useMealHistory

```typescript
// src/lib/hooks/useMealHistory.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mealApi } from '@/lib/api/meal';
import { toast } from 'sonner';

export function useMealHistory(params?: { period?: string }) {
  return useQuery({
    queryKey: ['meals', 'history', params],
    queryFn: () => mealApi.getHistory(params),
  });
}

export function useSubmitFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mealApi.submitFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
      toast.success('Cảm ơn feedback! AI sẽ học thêm.');
    },
  });
}
```

---

## 🔄 Server components vs Client components

### Server components (default)
- Static pages
- Pages that fetch public data (restaurant details, etc.)
- Landing page
- SEO-critical pages

### Client components (add `'use client'`)
- Any component with state (useState, useReducer)
- Any component with hooks (useQuery, useAuth)
- Event handlers
- Browser APIs (geolocation)
- Most interactive components

### Hybrid pattern

```tsx
// Server component (wrapper)
import { RecommendationList } from './RecommendationList';

async function getInitialData() {
  // Fetch on server
  const data = await fetch('...').then(r => r.json());
  return data;
}

export default async function Page() {
  const initialData = await getInitialData();

  return <RecommendationList initialData={initialData} />;
}

// Client component (interactive)
'use client';
export function RecommendationList({ initialData }) {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    initialData,
  });

  // ...
}
```

---

## 📊 Event Tracking

### File: `src/lib/utils/analytics.ts`

```typescript
import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

export function track(event: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.capture(event, properties);
  }
}

export function identify(userId: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && posthog.__loaded) {
    posthog.identify(userId, properties);
  }
}

// Predefined events
export const analytics = {
  userSignup: (method: 'email' | 'google') =>
    track('user_signup', { method }),

  onboardingStarted: () => track('onboarding_started'),

  onboardingCompleted: (durationMs: number) =>
    track('onboarding_completed', { durationMs }),

  recommendationViewed: (recId: string) =>
    track('recommendation_viewed', { recommendationId: recId }),

  recommendationCardClicked: (recId: string, category: string, index: number) =>
    track('recommendation_card_clicked', {
      recommendationId: recId,
      category,
      index
    }),

  feedbackSubmitted: (emoji: string, regret: string) =>
    track('feedback_submitted', { emoji, regret }),
};
```

---

## 🎯 Best practices

### 1. Avoid prop drilling
Nếu cần truyền data qua 3+ component → dùng Zustand store hoặc React Query.

### 2. Optimistic updates
```tsx
const submitFeedback = useMutation({
  mutationFn: mealApi.submitFeedback,
  onMutate: async (newFeedback) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries({ queryKey: ['meals'] });
    
    // Snapshot previous
    const previous = queryClient.getQueryData(['meals']);
    
    // Optimistically update
    queryClient.setQueryData(['meals'], (old: any) => ({
      ...old,
      feedback: newFeedback,
    }));
    
    return { previous };
  },
  onError: (err, newFeedback, context) => {
    // Rollback
    queryClient.setQueryData(['meals'], context?.previous);
  },
});
```

### 3. Proper loading states
Luôn show skeleton loading, không spinner (cho app)

### 4. Error boundaries
Wrap key areas với ErrorBoundary để lỗi không crash toàn app.
