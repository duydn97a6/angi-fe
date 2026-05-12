'use client';

import { WifiOff, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">
          <WifiOff className="mx-auto h-16 w-16 text-gray-300" />
        </div>
        <h1 className="text-h1 font-medium text-gray-900">
          Mất kết nối rồi 😅
        </h1>
        <p className="mt-2 text-body text-gray-500">
          AnGi cần internet để gợi ý món cho bạn
        </p>
        <p className="mt-1 text-body-sm text-gray-400">
          Kiểm tra wifi hoặc dữ liệu di động rồi thử lại nhé
        </p>
        <Button
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          <RotateCw className="h-4 w-4" />
          Thử lại
        </Button>
      </div>
    </div>
  );
}