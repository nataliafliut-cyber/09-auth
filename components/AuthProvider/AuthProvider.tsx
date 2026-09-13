'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getSession } from '@/lib/api/clientApi';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getSession()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, [setUser]);

  return <>{children}</>;
}