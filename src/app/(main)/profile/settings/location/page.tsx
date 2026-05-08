'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth';
import { useLocationStore } from '@/lib/stores/locationStore';
import { userApi } from '@/lib/api/user';
import { useAuthStore } from '@/lib/stores/authStore';
import { toast } from 'sonner';
import { MESSAGES } from '@/lib/constants/messages';

export default function LocationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);
  const { currentLocation, getCurrentLocation, isLoading: locationLoading } = useLocationStore();

  const prefs = user?.preferences ?? {};
  const [address, setAddress] = useState(prefs.officeAddress ?? '');
  const [radius, setRadius] = useState(prefs.searchRadiusMeters ?? 1000);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await userApi.updatePreferences({
        officeLat: currentLocation?.lat ?? prefs.officeLat,
        officeLng: currentLocation?.lng ?? prefs.officeLng,
        officeAddress: address,
        searchRadiusMeters: radius,
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
          <h1 className="text-h2 font-medium">Vị trí</h1>
        </div>

        {/* Current location */}
        <section className="mb-6">
          <h2 className="mb-2 text-body font-medium">Vị trí hiện tại</h2>
          <div className="flex items-center gap-3 rounded-md bg-gray-50 p-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-body-sm text-gray-600">
              {currentLocation
                ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
                : 'Chưa xác định'}
            </span>
            <Button
              variant="ghost"
              size="md"
              onClick={() => getCurrentLocation()}
              loading={locationLoading}
              className="ml-auto"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Office address */}
        <section className="mb-6">
          <h2 className="mb-2 text-body font-medium">Địa chỉ văn phòng</h2>
          <Input
            placeholder="Nhập địa chỉ văn phòng..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </section>

        {/* Search radius */}
        <section className="mb-8">
          <h2 className="mb-2 text-body font-medium">Bán kính tìm quán ăn</h2>
          <div className="flex gap-2">
            {[500, 1000, 2000].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRadius(r)}
                className={`flex-1 rounded-md border py-2 text-body-sm transition-all ${
                  radius === r
                    ? 'border-coral-400 bg-coral-50 font-medium text-coral-800'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {r < 1000 ? `${r}m` : `${r / 1000}km`}
              </button>
            ))}
          </div>
        </section>

        <Button fullWidth onClick={handleSave} loading={saving}>
          {MESSAGES.COMMON.SAVE}
        </Button>
      </div>
    </div>
  );
}