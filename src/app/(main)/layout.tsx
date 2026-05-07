import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { AuthGuard } from '@/components/shared/AuthGuard';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white pb-14 md:pb-0">
        <Header />
        <main>{children}</main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}