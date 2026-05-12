import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nhà hàng',
  description: 'Chi tiết nhà hàng và thực đơn',
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return children;
}