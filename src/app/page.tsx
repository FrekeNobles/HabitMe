'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';
import { getSession } from '@/lib/storage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Show splash screen for 1.8 second (between 
    const timer = setTimeout(() => {
      const session = getSession();

      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}