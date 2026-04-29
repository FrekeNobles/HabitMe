import type { Metadata , Viewport} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PWARegister from '@/components/shared/PWARegister';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'HabitMe - Build Better Habits',
  description: 'A minimalist habit tracker for building consistent routines',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HabitMe',
  },
};

 export const viewport: Viewport = {
   themeColor: '#000000',
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased font-sans min-h-screen">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}

