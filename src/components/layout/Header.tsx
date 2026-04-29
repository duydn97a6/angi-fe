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
                    ? 'font-medium text-coral-400'
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
              <Cloud className="mr-1 inline h-3 w-3" />
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
