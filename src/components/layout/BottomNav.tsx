'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Home, User, Users } from 'lucide-react';
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
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white md:hidden"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="grid h-14 grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              role="tab"
              aria-selected={isActive}
              aria-label={item.label}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5 text-caption transition-colors duration-200',
                isActive ? 'text-coral-400' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              {isActive && (
                <span className="absolute top-0 h-0.5 w-6 rounded-b-full bg-coral-400 transition-all duration-200" />
              )}
              <Icon className="h-5 w-5 transition-transform duration-150 active:scale-90" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}