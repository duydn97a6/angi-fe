import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Gợi ý món ăn thông minh dựa trên khẩu vị, thời tiết và vị trí của bạn',
  openGraph: {
    title: 'AnGi - Gợi ý món ăn hôm nay',
    description: 'AI đã phân tích thời tiết, vị trí và khẩu vị của bạn',
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}