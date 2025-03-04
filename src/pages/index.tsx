import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { restaurante } = useAuth();

  useEffect(() => {
    if (restaurante) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [restaurante]);

  return null;
}
