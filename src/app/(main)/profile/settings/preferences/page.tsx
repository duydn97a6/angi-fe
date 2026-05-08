'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChipSelector } from '@/components/onboarding/ChipSelector';
import { useAuth } from '@/lib/hooks/useAuth';
import { userApi } from '@/lib/api/user';
import { useAuthStore } from '@/lib/stores/authStore';
import { toast } from 'sonner';
import { MESSAGES } from '@/lib/constants/messages';

const regionOptions = [
  { value: 'north', label: 'Miền Bắc' },
  { value: 'central', label: 'Miền Trung' },
  { value: 'south', label: 'Miền Nam' },
];

const dietOptions = [
  { value: 'normal', label: 'Bình thường' },
  { value: 'vegetarian', label: 'Ăn chay thi thoảng' },
  { value: 'vegan', label: 'Ăn chay trường' },
  { value: 'healthy', label: 'Healthy/Fit' },
];

const excludedFoodOptions = [
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

export default function PreferencesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);

  const prefs = user?.preferences ?? {};

  const [region, setRegion] = useState<string[]>(prefs.region ? [prefs.region] : []);
  const [dietType, setDietType] = useState<string[]>(prefs.dietType ? [prefs.dietType] : []);
  const [excludedFoods, setExcludedFoods] = useState<string[]>(prefs.excludedFoods ?? []);
  const [budgetMin, setBudgetMin] = useState(prefs.budgetMin ?? 20000);
  const [budgetMax, setBudgetMax] = useState(prefs.budgetMax ?? 200000);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await userApi.updatePreferences({
        region: region[0] || undefined,
        dietType: dietType[0] || undefined,
        excludedFoods,
        budgetMin,
        budgetMax,
      });
      setUser({ ...user!, preferences: updatedUser });
      toast.success(MESSAGES.COMMON.SAVE + ' thành công');
      router.back();
    } catch {
      toast.error(MESSAGES.COMMON.ERROR);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-h2 font-medium">Chỉnh sửa sở thích</h1>
        </div>

        <section className="mb-6">
          <h2 className="mb-2 text-body font-medium">Vùng miền</h2>
          <ChipSelector options={regionOptions} selected={region} onChange={setRegion} />
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-body font-medium">Chế độ ăn</h2>
          <ChipSelector options={dietOptions} selected={dietType} onChange={setDietType} />
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-body font-medium">Món không ăn</h2>
          <ChipSelector options={excludedFoodOptions} selected={excludedFoods} onChange={setExcludedFoods} />
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-body font-medium">Ngân sách trung bình/bữa</h2>
          <div className="flex items-center gap-3 text-body-sm">
            <input
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              className="flex-1 accent-coral-400"
            />
            <span className="w-20 text-right">{(budgetMin / 1000).toFixed(0)}k</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-body-sm">
            <input
              type="range"
              min={budgetMin}
              max={500000}
              step={5000}
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="flex-1 accent-coral-400"
            />
            <span className="w-20 text-right">{(budgetMax / 1000).toFixed(0)}k</span>
          </div>
          <p className="mt-1 text-caption text-gray-400">
            {new Intl.NumberFormat('vi-VN').format(budgetMin)}đ — {new Intl.NumberFormat('vi-VN').format(budgetMax)}đ
          </p>
        </section>

        <Button fullWidth onClick={handleSave} loading={saving}>
          {MESSAGES.COMMON.SAVE}
        </Button>
      </div>
    </div>
  );
}