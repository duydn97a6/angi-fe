import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hồ sơ',
  description: 'Quản lý hồ sơ và cài đặt tài khoản AnGi',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}