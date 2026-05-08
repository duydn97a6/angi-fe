'use client';

import Link from 'next/link';
import { ChevronRight, Settings, MapPin, Users, Shield, Share2, Info, LogOut, Bell } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/lib/hooks/useAuth';
import { useMealStats } from '@/lib/hooks/useMealHistory';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { data: stats } = useMealStats({ period: 'all' });

  if (!user) return null;

  const aiPercent = Math.min(
    100,
    Math.round((stats?.totalMeals ?? 0) / 50 * 100)
  );
  const totalMeals = stats?.totalMeals ?? 0;
  const favoriteCount = stats?.topDishes?.length ?? 0;

  return (
    <div className="px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto max-w-2xl">
        {/* User info */}
        <div className="mb-6 flex flex-col items-center">
          <Avatar name={user.name} src={user.avatarUrl} size="xl" />
          <h2 className="mt-3 text-h2 font-medium">{user.name}</h2>
          <p className="text-body-sm text-gray-500">{user.email}</p>
        </div>

        {/* AI understanding */}
        <div className="mb-6 rounded-lg bg-coral-50 p-4">
          <p className="text-body-sm font-medium text-coral-800">
            AI đã hiểu bạn {aiPercent}%
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-coral-100">
            <div
              className="h-full rounded-full bg-coral-400 transition-all duration-500"
              style={{ width: `${aiPercent}%` }}
            />
          </div>
          <p className="mt-2 text-caption text-coral-600">
            {totalMeals} bữa ăn • {favoriteCount} món yêu thích
          </p>
        </div>

        {/* Settings menu */}
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <MenuItem href="/profile/settings/preferences" icon={Settings} label="Chỉnh sửa sở thích" />
          <MenuItem href="/profile/settings/location" icon={MapPin} label="Vị trí" />
          <MenuItem href="/profile/settings/notifications" icon={Bell} label="Thông báo" />
          <MenuItem href="/groups" icon={Users} label="Thành viên nhóm" />
          <MenuItem href="/profile/settings/privacy" icon={Shield} label="Dữ liệu & quyền riêng tư" />
          <MenuItem href="/invite" icon={Share2} label="Giới thiệu bạn bè" />
          <MenuItem href="/about" icon={Info} label="Về AnGi" />
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 p-4 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-body-sm">Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-gray-500" />
        <span className="text-body-sm">{label}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </Link>
  );
}