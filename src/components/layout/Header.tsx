'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Cloud } from 'lucide-react';
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
    <header className="hidden border-b border-gray-100 bg-white md:block" role="banner">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-lg font-medium" aria-label="AnGi - Trang chủ">
            🍜 AnGi
          </Link>
          <nav className="flex gap-4" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative text-body-sm transition-colors duration-200',
                  pathname.startsWith(item.href)
                    ? 'font-medium text-coral-400'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {item.label}
                {pathname.startsWith(item.href) && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-t-full bg-coral-400" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {weather && (
            <span className="text-caption text-gray-500" aria-label={`${weather.temp} độ C`}>
              <Cloud className="mr-1 inline h-3 w-3" aria-hidden="true" />
              {weather.temp}°C
            </span>
          )}
          <button className="text-gray-600 hover:text-gray-900" aria-label="Thông báo">
            <Bell className="h-5 w-5" />
          </button>
          {user && <Avatar name={user.name} size="sm" />}
        </div>
      </div>
    </header>
  );
}