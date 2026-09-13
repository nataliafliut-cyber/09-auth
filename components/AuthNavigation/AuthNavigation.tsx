'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import styles from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await apiLogout();
      logout();
      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={styles.nav}>
      {isAuthenticated ? (
        <div className={styles.userSection}>
          <span>{user?.username}</span>
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.authLinks}>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}