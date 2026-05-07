'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const sidebarItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/groups', icon: Users, label: 'Nhóm' },
  { href: '/history', icon: BarChart3, label: 'Lịch sử' },
  { href: '/profile', icon: User, label: 'Cá nhân' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-gray-100 bg-white lg:block">
      <nav className="flex flex-col gap-1 p-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-body-sm transition-colors',
                isActive
                  ? 'bg-coral-50 font-medium text-coral-400'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}