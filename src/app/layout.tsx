import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#D85A30',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'AnGi - AI gợi ý món ăn',
    template: '%s | AnGi',
  },
  description: 'AI quyết định món ăn thay bạn - Gợi ý nhà hàng thông minh dựa trên khẩu vị, thời tiết và vị trí',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.svg',
    apple: '/icons/icon-192.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'AnGi',
    title: 'AnGi - AI gợi ý món ăn',
    description: 'AI quyết định món ăn thay bạn',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AnGi',
    description: 'AI quyết định món ăn thay bạn',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
  };

  return (
    <html lang="vi">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}