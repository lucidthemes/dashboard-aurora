import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { DEFAULT_METADATA } from '@/lib/metadata';

import './globals.css';

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
