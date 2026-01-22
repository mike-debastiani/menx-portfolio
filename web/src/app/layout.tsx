import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import ScrollLockReset from '@/components/layout/ScrollLockReset';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Mike De Bastiani - Digital Product Designer',
  description: 'Portfolio von Mike De Bastiani - Student und Digital Product Designer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ScrollLockReset />
        <Header />
        {children}
      </body>
    </html>
  );
}
