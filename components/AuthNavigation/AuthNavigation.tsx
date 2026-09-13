'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { clientLogout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await clientLogout();
      logout();
      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isAuthenticated) {
    return (
      <div className={css.nav}>
        <span className={css.user}>Witaj, {user?.username}</span>
        <Link href="/profile" className={css.link}>Profil</Link>
        <Link href="/notes" className={css.link}>Notatki</Link>
        <button onClick={handleLogout} className={css.button}>Wyloguj</button>
      </div>
    );
  }

  return (
    <div className={css.nav}>
      <Link href="/sign-in" className={css.link}>Zaloguj</Link>
      <Link href="/sign-up" className={css.link}>Zarejestruj</Link>
    </div>
  );
}