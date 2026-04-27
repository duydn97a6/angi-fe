# 02. Component Library

> Các component tái sử dụng với code examples đầy đủ. Copy-paste để dùng.

## 🎨 Base Components (UI primitives)

### Button

```tsx
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-coral-400 text-white hover:bg-coral-600',
        secondary: 'bg-white text-coral-400 border border-coral-200 hover:bg-coral-50',
        ghost: 'text-gray-600 hover:bg-gray-100',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? 'Đang xử lý...' : children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

### Input

```tsx
// components/ui/input.tsx
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-body-sm font-medium text-gray-600">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'h-11 w-full rounded-md border border-gray-200 px-3.5 text-body text-gray-900 transition-all',
            'placeholder:text-gray-400',
            'focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-50',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-caption text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
```

### Card

```tsx
// components/ui/card.tsx
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  featured?: boolean;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, featured, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-gray-100 bg-white p-4',
        featured && 'border-2 border-coral-400',
        interactive && 'cursor-pointer transition-all hover:border-gray-200 hover:shadow-sm active:scale-[0.99]',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-3', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-h3 font-medium text-gray-900', className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-body-sm text-gray-600', className)} {...props} />
);
```

### Avatar

```tsx
// components/ui/avatar.tsx
import { cn } from '@/lib/utils/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-16 h-16 text-xl',
};

// Color based on name hash (consistent per user)
const colors = [
  'bg-coral-50 text-coral-800',
  'bg-purple-50 text-purple-800',
  'bg-amber-50 text-amber-800',
  'bg-greenie-50 text-greenie-800',
];

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const colorIndex = name.charCodeAt(0) % colors.length;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover', sizeClasses[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-medium',
        sizeClasses[size],
        colors[colorIndex],
        className
      )}
    >
      {initials}
    </div>
  );
}
```

### Badge / Tag

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';
import { type HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        safe: 'bg-greenie-50 text-greenie-800',
        familiar: 'bg-purple-50 text-purple-800',
        discovery: 'bg-amber-50 text-amber-800',
        coral: 'bg-coral-50 text-coral-800',
        info: 'bg-blue-50 text-blue-800',
        success: 'bg-green-50 text-green-800',
        warning: 'bg-yellow-50 text-yellow-800',
        danger: 'bg-red-50 text-red-800',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
```

---

## 🍜 Recommendation Components

### RecommendationCard (quan trọng nhất)

```tsx
// components/recommendation/RecommendationCard.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Bike, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatDistance } from '@/lib/utils/format';
import type { RecommendationItem } from '@/types';

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  isFeatured?: boolean;
  onClick?: () => void;
}

export function RecommendationCard({
  recommendation,
  isFeatured,
  onClick,
}: RecommendationCardProps) {
  const { restaurant, dish, category, explanation } = recommendation;

  const categoryLabels = {
    safe: 'An toàn',
    familiar: 'Quen thuộc',
    discovery: 'Khám phá',
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Card
        featured={isFeatured}
        interactive
        onClick={onClick}
        className="relative"
      >
        {isFeatured && (
          <div className="absolute -top-2 left-3 flex items-center gap-1 rounded-md bg-coral-400 px-2 py-0.5 text-caption font-medium text-white">
            <Sparkles className="h-3 w-3" />
            AI đề xuất #1
          </div>
        )}

        <Badge variant={category} className="mb-2">
          {categoryLabels[category]}
        </Badge>

        <h3 className="text-body font-medium text-gray-900 line-clamp-2">
          {restaurant.name}
        </h3>

        <p className="mt-1 text-body-sm text-gray-600">
          {dish?.name} · {formatPrice(restaurant.avgPrice)}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-caption text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {formatDistance(restaurant.distance)}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {restaurant.rating?.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Bike className="h-3 w-3" />
            {recommendation.estimatedDeliveryMinutes}p
          </span>
        </div>

        {explanation && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <p className="text-caption text-gray-600 flex gap-1.5">
              <span>💡</span>
              <span>{explanation}</span>
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
```

### RecommendationGrid

```tsx
// components/recommendation/RecommendationGrid.tsx
'use client';

import { RecommendationCard } from './RecommendationCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { RecommendationItem } from '@/types';

interface Props {
  recommendations: RecommendationItem[];
  isLoading?: boolean;
  onCardClick: (rec: RecommendationItem, index: number) => void;
}

export function RecommendationGrid({ recommendations, isLoading, onCardClick }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
      {recommendations.map((rec, i) => (
        <RecommendationCard
          key={rec.restaurant.id}
          recommendation={rec}
          isFeatured={rec.category === 'familiar'}  // Middle card featured
          onClick={() => onCardClick(rec, i)}
        />
      ))}
    </div>
  );
}
```

### CategoryTag

```tsx
// components/recommendation/CategoryTag.tsx
import { Badge } from '@/components/ui/badge';

type Category = 'safe' | 'familiar' | 'discovery';

const labels: Record<Category, string> = {
  safe: 'An toàn',
  familiar: 'Quen thuộc',
  discovery: 'Khám phá',
};

export function CategoryTag({ category }: { category: Category }) {
  return <Badge variant={category}>{labels[category]}</Badge>;
}
```

---

## 👋 Onboarding Components

### ProgressBar

```tsx
// components/onboarding/ProgressBar.tsx
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            i < current ? 'bg-coral-400' : 'bg-gray-200'
          )}
        />
      ))}
    </div>
  );
}
```

### OptionCard (cho onboarding)

```tsx
// components/onboarding/OptionCard.tsx
'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface OptionCardProps {
  title: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ title, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-md border p-3 text-left transition-all',
        selected
          ? 'border-2 border-coral-400 bg-coral-50'
          : 'border border-gray-200 bg-white hover:border-gray-300'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className={cn(
            'text-body font-medium',
            selected ? 'text-coral-800' : 'text-gray-900'
          )}>
            {title}
          </div>
          {description && (
            <div className={cn(
              'mt-0.5 text-body-sm',
              selected ? 'text-coral-600' : 'text-gray-500'
            )}>
              {description}
            </div>
          )}
        </div>
        {selected && <Check className="h-5 w-5 text-coral-400 shrink-0" />}
      </div>
    </button>
  );
}
```

### ChipSelector (multi-select chips)

```tsx
// components/onboarding/ChipSelector.tsx
'use client';

import { cn } from '@/lib/utils/cn';

interface ChipSelectorProps {
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
  multi?: boolean;
}

export function ChipSelector({ options, selected, onChange, multi = true }: ChipSelectorProps) {
  const toggle = (value: string) => {
    if (!multi) {
      onChange([value]);
      return;
    }
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-caption transition-all',
              isSelected
                ? 'border-red-600 bg-red-50 text-red-800 font-medium'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            )}
          >
            {isSelected && '✓ '}{opt.label}
          </button>
        );
      })}
    </div>
  );
}
```

---

## 💬 Feedback Components

### FeedbackModal

```tsx
// components/feedback/FeedbackModal.tsx
'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { EmojiSelector } from './EmojiSelector';
import { ChipSelector } from '@/components/onboarding/ChipSelector';

interface FeedbackModalProps {
  meal: { id: string; restaurantName: string; dishName: string; time: string };
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    emoji: 'sad' | 'neutral' | 'happy';
    regretLevel: 'none' | 'slight' | 'high';
    tags: string[];
  }) => Promise<void>;
}

const regretOptions = [
  { value: 'none', label: 'Không hề' },
  { value: 'slight', label: 'Hơi chút' },
  { value: 'high', label: 'Có' },
];

const tagOptions = [
  { value: 'delicious', label: 'Ngon' },
  { value: 'cheap', label: 'Rẻ' },
  { value: 'fast', label: 'Nhanh' },
  { value: 'near', label: 'Gần' },
  { value: 'dirty', label: 'Dơ' },
  { value: 'expensive', label: 'Đắt' },
];

export function FeedbackModal({ meal, open, onClose, onSubmit }: FeedbackModalProps) {
  const [emoji, setEmoji] = useState<'sad' | 'neutral' | 'happy' | null>(null);
  const [regretLevel, setRegretLevel] = useState<'none' | 'slight' | 'high' | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const canSubmit = emoji !== null;

  const handleSubmit = async () => {
    if (!emoji) return;
    setLoading(true);
    try {
      await onSubmit({
        emoji,
        regretLevel: regretLevel ?? 'none',
        tags,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl p-5 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:right-auto md:w-[480px] md:rounded-xl">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 md:hidden" />

          <div className="mb-4 flex items-center gap-3 rounded-md bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-coral-50 text-lg">
              🍚
            </div>
            <div>
              <div className="text-body font-medium">{meal.restaurantName}</div>
              <div className="text-caption text-gray-400">Ăn lúc {meal.time}</div>
            </div>
          </div>

          <Dialog.Title className="text-h2 font-medium">
            Bữa vừa rồi thế nào?
          </Dialog.Title>
          <Dialog.Description className="text-body-sm text-gray-500 mb-5">
            Feedback giúp AI hiểu bạn hơn
          </Dialog.Description>

          <EmojiSelector value={emoji} onChange={setEmoji} />

          {emoji && (
            <>
              <h4 className="mt-5 mb-2 text-body font-medium">Bạn có hối hận không?</h4>
              <div className="flex gap-2">
                {regretOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRegretLevel(opt.value as any)}
                    className={`flex-1 rounded-md border py-2 text-body-sm transition-all ${
                      regretLevel === opt.value
                        ? 'border-coral-400 bg-coral-50 text-coral-800 font-medium'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <h4 className="mt-5 mb-2 text-body font-medium">Lý do (không bắt buộc)</h4>
              <ChipSelector options={tagOptions} selected={tags} onChange={setTags} />
            </>
          )}

          <Button
            fullWidth
            className="mt-6"
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={loading}
          >
            Gửi feedback
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### EmojiSelector

```tsx
// components/feedback/EmojiSelector.tsx
import { cn } from '@/lib/utils/cn';

type Emoji = 'sad' | 'neutral' | 'happy';

const options = [
  { value: 'sad' as Emoji, emoji: '😕', label: 'Tệ' },
  { value: 'neutral' as Emoji, emoji: '😐', label: 'Ổn' },
  { value: 'happy' as Emoji, emoji: '😋', label: 'Tuyệt!' },
];

interface Props {
  value: Emoji | null;
  onChange: (emoji: Emoji) => void;
}

export function EmojiSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-md border p-4 transition-all',
              isSelected
                ? opt.value === 'happy'
                  ? 'border-2 border-green-500 bg-green-50'
                  : opt.value === 'sad'
                  ? 'border-2 border-red-500 bg-red-50'
                  : 'border-2 border-gray-400 bg-gray-50'
                : 'border border-gray-200 bg-white hover:border-gray-300'
            )}
          >
            <div className="text-2xl">{opt.emoji}</div>
            <div className={cn(
              'text-caption',
              isSelected ? 'font-medium' : 'text-gray-600'
            )}>
              {opt.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
```

---

## 🏗 Layout Components

### Header (Desktop nav)

```tsx
// components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cloud, Bell } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/lib/hooks/useAuth';
import { useWeather } from '@/lib/hooks/useWeather';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/groups', label: 'Nhóm' },
  { href: '/history', label: 'Lịch sử' },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { data: weather } = useWeather();

  return (
    <header className="hidden border-b border-gray-100 bg-white md:block">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-lg font-medium">
            🍜 AnGi
          </Link>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-body-sm transition-colors',
                  pathname.startsWith(item.href)
                    ? 'text-coral-400 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {weather && (
            <span className="text-caption text-gray-500">
              <Cloud className="inline h-3 w-3 mr-1" />
              {weather.temp}°C
            </span>
          )}
          <button className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
          </button>
          {user && <Avatar name={user.name} size="sm" />}
        </div>
      </div>
    </header>
  );
}
```

### BottomNav (Mobile)

```tsx
// components/layout/BottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const items = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/groups', icon: Users, label: 'Nhóm' },
  { href: '/history', icon: BarChart3, label: 'Lịch sử' },
  { href: '/profile', icon: User, label: 'Cá nhân' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white md:hidden">
      <div className="grid grid-cols-4 h-14">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 text-caption transition-colors',
                isActive ? 'text-coral-400' : 'text-gray-400'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### ContextBar (Weather/location info)

```tsx
// components/layout/ContextBar.tsx
'use client';

import { Cloud, MapPin, Clock } from 'lucide-react';
import { useWeather } from '@/lib/hooks/useWeather';
import { useLocation } from '@/lib/hooks/useLocation';

export function ContextBar() {
  const { data: weather } = useWeather();
  const { location } = useLocation();
  const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2 text-caption">
      {weather && (
        <span className="flex items-center gap-1 text-blue-800">
          <Cloud className="h-3 w-3" />
          {weather.temp}°C
        </span>
      )}
      {location && (
        <>
          <span className="text-blue-400">·</span>
          <span className="flex items-center gap-1 text-blue-800">
            <MapPin className="h-3 w-3" />
            {location.district}
          </span>
        </>
      )}
      <span className="text-blue-400">·</span>
      <span className="flex items-center gap-1 text-blue-800">
        <Clock className="h-3 w-3" />
        {time}
      </span>
    </div>
  );
}
```
