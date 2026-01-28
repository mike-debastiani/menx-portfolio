import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import ScrollLockReset from '@/components/layout/ScrollLockReset';
import './globals.css';

// Font A/B Tests:
// To compare Google Fonts, re-add additional fonts here (e.g. Inter, Manrope, Space Grotesk),
// set their `variable` tokens, and switch the html class in this file.
const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
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
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} font-sans-geist`}
    >
      <body className="antialiased">
        <ScrollLockReset />
        <Header />
        {children}
      </body>
    </html>
  );
}
