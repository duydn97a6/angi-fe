import { Mascot } from '@/components/shared/Mascot';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <Mascot mood="happy" size="lg" />
          </div>
          <h1 className="text-display text-gray-900">AnGi</h1>
          <p className="mt-2 text-body text-gray-500">AI quyết định món ăn thay bạn</p>
        </div>
        {children}
      </div>
    </main>
  );
}
