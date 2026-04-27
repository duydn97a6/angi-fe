# 03. Pages Specification

> Mỗi trang với full implementation để vibe code nhanh.

## 🏠 Home Page (/home)

### File: `src/app/(main)/home/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, XCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContextBar } from '@/components/layout/ContextBar';
import { RecommendationGrid } from '@/components/recommendation/RecommendationGrid';
import { FeedbackModal } from '@/components/feedback/FeedbackModal';
import { useRecommendation } from '@/lib/hooks/useRecommendation';
import { useLocation } from '@/lib/hooks/useLocation';
import { useAuth } from '@/lib/hooks/useAuth';
import { recommendationApi } from '@/lib/api/recommendation';
import type { RecommendationItem } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { location } = useLocation();
  const [feedbackMeal, setFeedbackMeal] = useState<any>(null);

  const {
    data: recommendation,
    refetch,
    isLoading,
    isFetching,
  } = useRecommendation(location?.lat, location?.lng);

  const handleCardClick = async (rec: RecommendationItem, index: number) => {
    if (!recommendation) return;

    await recommendationApi.trackClick(recommendation.recommendationId, index);

    // Deep link to food delivery app
    const url = rec.restaurant.deliveryLinks?.grabfood
      || rec.restaurant.deliveryLinks?.shopeefood
      || `/restaurants/${rec.restaurant.id}`;

    window.open(url, '_blank');
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 md:mb-6">
          <h1 className="text-h2 md:text-h1 font-medium">
            Chào {user?.name?.split(' ').pop() || 'bạn'}, trưa nay ăn gì? 👋
          </h1>
          <p className="mt-1 text-body-sm md:text-body text-gray-500 hidden md:block">
            AI đã phân tích thời tiết, vị trí và khẩu vị của bạn
          </p>
        </div>

        <div className="mb-4 md:hidden">
          <ContextBar />
        </div>

        <p className="mb-3 text-caption uppercase tracking-wider text-gray-400">
          3 gợi ý cho bạn
        </p>

        <RecommendationGrid
          recommendations={recommendation?.recommendations ?? []}
          isLoading={isLoading}
          onCardClick={handleCardClick}
        />

        <div className="mt-4 flex flex-wrap gap-2 md:mt-5 md:gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={() => refetch()}
            loading={isFetching}
          >
            <RefreshCw className="h-4 w-4" />
            Gợi ý khác
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => router.push('/home/anti-filter')}
          >
            <XCircle className="h-4 w-4" />
            Không muốn ăn...
          </Button>
          <Button
            variant="primary"
            size="md"
            className="md:ml-auto"
            onClick={() => router.push('/groups/create')}
          >
            <Users className="h-4 w-4" />
            Rủ cả nhóm cùng quyết
          </Button>
        </div>

        <WeeklyStats />
      </div>

      {feedbackMeal && (
        <FeedbackModal
          meal={feedbackMeal}
          open={!!feedbackMeal}
          onClose={() => setFeedbackMeal(null)}
          onSubmit={async (feedback) => {
            // Submit feedback
          }}
        />
      )}
    </div>
  );
}

function WeeklyStats() {
  return (
    <div className="mt-6 rounded-md bg-gray-50 p-3 md:p-4">
      <p className="mb-2 text-caption uppercase tracking-wider text-gray-400">
        Tuần này bạn đã ăn
      </p>
      <div className="flex flex-wrap gap-3 text-body-sm">
        <span>🍜 Phở (2)</span>
        <span>🍚 Cơm (3)</span>
        <span>🥗 Salad (1)</span>
        <span className="text-yellow-700">⚠ Nhiều dầu mỡ 60%</span>
      </div>
    </div>
  );
}
```

### File: `src/app/(main)/home/layout.tsx`

```tsx
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { AuthGuard } from '@/components/shared/AuthGuard';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white pb-14 md:pb-0">
        <Header />
        <main>{children}</main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
```

---

## 👋 Onboarding Pages

### File: `src/app/onboarding/layout.tsx`

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

const steps = ['region', 'location', 'diet', 'budget', 'finish'];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentStep = steps.findIndex(s => pathname.includes(s)) + 1;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 py-6">
        {currentStep > 0 && (
          <div className="mb-6">
            <ProgressBar current={currentStep} total={steps.length} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
```

### File: `src/app/onboarding/region/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { OptionCard } from '@/components/onboarding/OptionCard';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

const options = [
  { value: 'north', title: 'Miền Bắc', description: 'Phở, bún chả, bún đậu...' },
  { value: 'central', title: 'Miền Trung', description: 'Bún bò Huế, mì Quảng...' },
  { value: 'south', title: 'Miền Nam', description: 'Cơm tấm, hủ tiếu, bánh mì...' },
];

export default function RegionPage() {
  const router = useRouter();
  const { setRegion } = useOnboardingStore();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (!selected) return;
    setRegion(selected);
    router.push('/onboarding/location');
  };

  return (
    <div>
      <h1 className="mb-1.5 text-h2 font-medium">Bạn ở vùng miền nào?</h1>
      <p className="mb-5 text-body-sm text-gray-500">
        Để AI hiểu khẩu vị của bạn hơn
      </p>

      <div className="space-y-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            title={opt.title}
            description={opt.description}
            selected={selected === opt.value}
            onClick={() => setSelected(opt.value)}
          />
        ))}
      </div>

      <Button
        fullWidth
        className="mt-6"
        onClick={handleNext}
        disabled={!selected}
      >
        Tiếp tục →
      </Button>
      <button
        className="mt-3 w-full text-center text-caption text-gray-400"
        onClick={() => router.push('/home')}
      >
        Bỏ qua onboarding
      </button>
    </div>
  );
}
```

### File: `src/app/onboarding/location/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

export default function LocationPage() {
  const router = useRouter();
  const { setLocation } = useOnboardingStore();
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [radius, setRadius] = useState(1000);

  // Use Google Places Autocomplete in real implementation
  const handleAddressSearch = async () => {
    // Placeholder: Use Google Places API
    // On selection, set lat, lng, address
  };

  return (
    <div>
      <h1 className="mb-1.5 text-h2 font-medium">Văn phòng bạn ở đâu?</h1>
      <p className="mb-5 text-body-sm text-gray-500">
        AI sẽ tìm quán ăn quanh đây
      </p>

      <Input
        placeholder="Tìm địa chỉ..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Google Maps widget here in real implementation */}
      <div className="mt-4 h-[250px] rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        [Map component]
      </div>

      <div className="mt-5">
        <p className="mb-2 text-body font-medium">Bán kính tìm quán ăn</p>
        <div className="flex gap-2">
          {[500, 1000, 2000].map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`flex-1 rounded-md border py-2 text-body-sm transition-all ${
                radius === r
                  ? 'border-coral-400 bg-coral-50 text-coral-800 font-medium'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {r < 1000 ? `${r}m` : `${r/1000}km`}
            </button>
          ))}
        </div>
      </div>

      <Button
        fullWidth
        className="mt-6"
        onClick={() => {
          if (lat && lng) {
            setLocation({ lat, lng, address, radius });
            router.push('/onboarding/diet');
          }
        }}
        disabled={!lat}
      >
        Tiếp tục →
      </Button>
    </div>
  );
}
```

### File: `src/app/onboarding/diet/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChipSelector } from '@/components/onboarding/ChipSelector';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';

const foodOptions = [
  { value: 'seafood', label: 'Hải sản' },
  { value: 'beef', label: 'Thịt bò' },
  { value: 'pork', label: 'Thịt heo' },
  { value: 'spicy', label: 'Đồ cay' },
  { value: 'fried', label: 'Đồ chiên' },
  { value: 'offal', label: 'Lòng/nội tạng' },
  { value: 'cilantro', label: 'Rau mùi' },
  { value: 'peanut', label: 'Đậu phộng' },
  { value: 'dairy', label: 'Sữa' },
];

export default function DietPage() {
  const router = useRouter();
  const { setExcludedFoods } = useOnboardingStore();
  const [excluded, setExcluded] = useState<string[]>([]);

  const handleNext = () => {
    setExcludedFoods(excluded);
    router.push('/onboarding/budget');
  };

  return (
    <div>
      <h1 className="mb-1.5 text-h2 font-medium">Có món nào bạn KHÔNG ăn?</h1>
      <p className="mb-5 text-body-sm text-gray-500">
        Chọn tất cả mục phù hợp
      </p>

      <ChipSelector
        options={foodOptions}
        selected={excluded}
        onChange={setExcluded}
      />

      <Button fullWidth className="mt-8" onClick={handleNext}>
        Tiếp tục →
      </Button>
    </div>
  );
}
```

---

## 📝 Login Page

### File: `src/app/(auth)/login/page.tsx`

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/authStore';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await authApi.login(data);
      setAuth(response.user, response.tokens);
      toast.success('Đăng nhập thành công');
      router.push('/home');
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-sm px-4 py-10">
        <div className="mb-8 text-center">
          <div className="text-4xl mb-2">🍜</div>
          <h1 className="text-h1 font-medium">Chào mừng trở lại!</h1>
          <p className="mt-1 text-body-sm text-gray-500">
            Đăng nhập để xem gợi ý món ăn
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="minh@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button type="submit" fullWidth loading={isSubmitting}>
            Đăng nhập
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-caption text-gray-400">hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button variant="secondary" fullWidth>
          Đăng nhập với Google
        </Button>

        <p className="mt-6 text-center text-body-sm text-gray-500">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-coral-400 font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
```

---

## 📊 History Page

### File: `src/app/(main)/history/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { useMealHistory } from '@/lib/hooks/useMealHistory';
import { MealEntry } from '@/components/meal/MealEntry';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function HistoryPage() {
  const [period, setPeriod] = useState('week');
  const { data: meals, isLoading } = useMealHistory({ period });

  const groupedMeals = groupMealsByDate(meals ?? []);

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-h1 font-medium">Lịch sử bữa ăn</h1>

        <Tabs value={period} onValueChange={setPeriod} className="mt-4">
          <TabsList>
            <TabsTrigger value="week">Tuần này</TabsTrigger>
            <TabsTrigger value="month">Tháng này</TabsTrigger>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
          </TabsList>
        </Tabs>

        <WeeklyStats meals={meals ?? []} />

        <div className="mt-6 space-y-6">
          {Object.entries(groupedMeals).map(([date, dayMeals]) => (
            <section key={date}>
              <h3 className="mb-2 text-caption uppercase tracking-wider text-gray-400">
                {date}
              </h3>
              <div className="space-y-2">
                {dayMeals.map(meal => (
                  <MealEntry key={meal.id} meal={meal} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeeklyStats({ meals }: { meals: any[] }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-3">
      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-caption text-gray-500">Tổng bữa</p>
        <p className="text-h2 font-medium">{meals.length}</p>
      </div>
      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-caption text-gray-500">Chi tiêu</p>
        <p className="text-h2 font-medium">
          {meals.reduce((sum, m) => sum + (m.pricePaid ?? 0), 0).toLocaleString()}đ
        </p>
      </div>
      <div className="rounded-md bg-gray-50 p-3">
        <p className="text-caption text-gray-500">Đánh giá TB</p>
        <p className="text-h2 font-medium">4.2/5</p>
      </div>
    </div>
  );
}

function groupMealsByDate(meals: any[]): Record<string, any[]> {
  return meals.reduce((acc, meal) => {
    const date = new Date(meal.mealAt).toLocaleDateString('vi-VN');
    if (!acc[date]) acc[date] = [];
    acc[date].push(meal);
    return acc;
  }, {});
}
```

---

## 👤 Profile Page

### File: `src/app/(main)/profile/page.tsx`

```tsx
'use client';

import Link from 'next/link';
import { ChevronRight, Settings, MapPin, Users, Shield, Share, Info, LogOut } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const aiUnderstandingPercent = 72;

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-col items-center">
          <Avatar name={user.name} size="xl" />
          <h2 className="mt-3 text-h2 font-medium">{user.name}</h2>
          <p className="text-body-sm text-gray-500">{user.email}</p>
        </div>

        <div className="mb-6 rounded-lg bg-coral-50 p-4">
          <p className="text-body-sm font-medium text-coral-800">
            AI đã hiểu bạn {aiUnderstandingPercent}%
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-coral-100">
            <div
              className="h-full bg-coral-400 transition-all"
              style={{ width: `${aiUnderstandingPercent}%` }}
            />
          </div>
          <p className="mt-2 text-caption text-coral-600">
            45 bữa ăn • 12 món yêu thích
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <MenuItem href="/profile/settings/preferences" icon={Settings} label="Chỉnh sửa sở thích" />
          <MenuItem href="/profile/settings/location" icon={MapPin} label="Vị trí & thông báo" />
          <MenuItem href="/groups" icon={Users} label="Thành viên nhóm" />
          <MenuItem href="/profile/settings/privacy" icon={Shield} label="Dữ liệu & quyền riêng tư" />
          <MenuItem href="/invite" icon={Share} label="Giới thiệu bạn bè" />
          <MenuItem href="/about" icon={Info} label="Về AnGi" />
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-4 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-body-sm">Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ href, icon: Icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-gray-100 p-4 hover:bg-gray-50 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-gray-500" />
        <span className="text-body-sm">{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </Link>
  );
}
```
