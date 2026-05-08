'use client';

import { useState, useMemo } from 'react';
import { useMealHistory, useMealStats } from '@/lib/hooks/useMealHistory';
import { MealEntry } from '@/components/meal/MealEntry';
import { StatsCard } from '@/components/meal/StatsCard';
import { HealthWarning } from '@/components/meal/HealthWarning';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils/format';
import type { MealHistoryEntry } from '@/types';

const periods = [
  { value: 'week', label: 'Tuần này' },
  { value: 'month', label: 'Tháng này' },
  { value: 'all', label: 'Tất cả' },
] as const;

type Period = (typeof periods)[number]['value'];

export default function HistoryPage() {
  const [period, setPeriod] = useState<Period>('week');
  const { data: meals, isLoading: mealsLoading } = useMealHistory(
    period === 'week' ? { days: 7 } : period === 'month' ? { days: 30 } : undefined,
  );
  const { data: stats, isLoading: statsLoading } = useMealStats({ period });

  const grouped = useMemo(() => groupMealsByDate(meals ?? []), [meals]);

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-h1 font-medium">Lịch sử bữa ăn</h1>

        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)} className="mt-4">
          <TabsList>
            {periods.map((p) => (
              <TabsTrigger key={p.value} value={p.value}>
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Stats grid */}
        {statsLoading ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 rounded-md" />
            ))}
          </div>
        ) : stats ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <StatsCard label="Tổng bữa" value={stats.totalMeals} />
            <StatsCard label="Chi tiêu" value={formatPrice(stats.totalSpent)} />
            <StatsCard label="Đánh giá TB" value={`${stats.avgRating.toFixed(1)}/5`} />
          </div>
        ) : null}

        {/* Health warning */}
        {stats?.healthPattern?.warning && (
          <div className="mt-3">
            <HealthWarning
              warning={stats.healthPattern.warning}
              percentage={stats.healthPattern.oilyFoodPercentage}
            />
          </div>
        )}

        {/* Top cuisines */}
        {stats?.topCuisines && stats.topCuisines.length > 0 && (
          <div className="mt-4 rounded-md bg-gray-50 p-3">
            <p className="mb-1 text-caption uppercase tracking-wider text-gray-400">
              Món ăn nhiều nhất
            </p>
            <div className="flex flex-wrap gap-3 text-body-sm">
              {stats.topCuisines.map((c) => (
                <span key={c.cuisine}>
                  🍜 {c.cuisine} ({c.count})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Meal timeline */}
        <div className="mt-6 space-y-6">
          {mealsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 rounded-md" />
              ))}
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="py-8 text-center text-body-sm text-gray-400">
              Chưa có bữa ăn nào trong thời gian này
            </div>
          ) : (
            Object.entries(grouped).map(([dateLabel, dayMeals]) => (
              <section key={dateLabel}>
                <h3 className="mb-2 text-caption uppercase tracking-wider text-gray-400">
                  {dateLabel}
                </h3>
                <div className="space-y-2">
                  {dayMeals.map((meal) => (
                    <MealEntry key={meal.id} meal={meal} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function groupMealsByDate(meals: MealHistoryEntry[]): Record<string, MealHistoryEntry[]> {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dateLabel = (d: Date) => {
    if (d.toDateString() === today.toDateString()) return 'Hôm nay';
    if (d.toDateString() === yesterday.toDateString()) return 'Hôm qua';
    return d.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    });
  };

  return meals.reduce<Record<string, MealHistoryEntry[]>>((acc, meal) => {
    const d = new Date(meal.mealAt);
    const label = dateLabel(d);
    if (!acc[label]) acc[label] = [];
    acc[label].push(meal);
    return acc;
  }, {});
}