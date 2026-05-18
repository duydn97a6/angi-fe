import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { AuthGuard } from '@/components/shared/AuthGuard';
import { PageViewTracker } from '@/components/shared/PageViewTracker';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white pb-14 md:pb-0">
        <a href="#main-content" className="skip-nav">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <BottomNav />
        <PageViewTracker />
      </div>
    </AuthGuard>
  );
}