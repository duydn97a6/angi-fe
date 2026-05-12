import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch sử bữa ăn',
  description: 'Xem lại các bữa ăn và thống kê dinh dưỡng của bạn',
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}