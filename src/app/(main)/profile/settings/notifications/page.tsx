'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UtensilsCrossed, MessageSquare, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { userApi } from '@/lib/api/user';
import { useAuthStore } from '@/lib/stores/authStore';
import { toast } from 'sonner';
import { MESSAGES } from '@/lib/constants/messages';

interface NotificationSetting {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const notifications: NotificationSetting[] = [
  {
    id: 'mealTime',
    icon: UtensilsCrossed,
    title: 'Gợi ý bữa ăn',
    description: 'Nhắc nhở gợi ý món ăn mỗi trưa',
  },
  {
    id: 'feedback',
    icon: MessageSquare,
    title: 'Nhắc feedback',
    description: 'Nhắc đánh giá bữa ăn 2 giờ sau',
  },
  {
    id: 'group',
    icon: Users,
    title: 'Mời nhóm',
    description: 'Khi có người rủ ăn cùng',
  },
  {
    id: 'weekly',
    icon: Calendar,
    title: 'Tổng kết tuần',
    description: 'Nhận báo cáo ẩm thực cuối tuần',
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const setUser = useAuthStore((s) => s.setUser);

  const prefs = user?.preferences ?? {};
  const initialNotifications = (prefs as any).notifications ?? {
    mealTime: true,
    feedback: true,
    group: true,
    weekly: false,
  };

  const [enabled, setEnabled] = useState<Record<string, boolean>>(initialNotifications);
  const [saving, setSaving] = useState(false);

  const toggle = (id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await userApi.updatePreferences({
        notifications: enabled,
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
          <h1 className="text-h2 font-medium">Thông báo</h1>
        </div>

        <p className="mb-4 text-body-sm text-gray-500">
          Quản lý loại thông báo bạn muốn nhận. Không gửi sau 22:00 hoặc trước 7:00.
        </p>

        <div className="space-y-1 overflow-hidden rounded-lg border border-gray-100">
          {notifications.map((n) => {
            const Icon = n.icon;
            const isOn = enabled[n.id] ?? false;
            return (
              <div
                key={n.id}
                className="flex items-center justify-between border-b border-gray-100 p-4 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-body-sm font-medium">{n.title}</p>
                    <p className="text-caption text-gray-400">{n.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(n.id)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    isOn ? 'bg-coral-400' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={isOn}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      isOn ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <Button fullWidth className="mt-6" onClick={handleSave} loading={saving}>
          {MESSAGES.COMMON.SAVE}
        </Button>
      </div>
    </div>
  );
}