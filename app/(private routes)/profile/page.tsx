'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Profil użytkownika</h1>
      <div className={css.infoGroup}>
        <div className={css.infoRow}>
          <span className={css.label}>Nazwa użytkownika:</span>
          <span className={css.value}>{user?.username || 'Brak danych'}</span>
        </div>
        <div className={css.infoRow}>
          <span className={css.label}>Email:</span>
          <span className={css.value}>{user?.email || 'Brak danych'}</span>
        </div>
      </div>
      <Link href="/profile/edit" className={css.editButton}>
        Edytuj profil
      </Link>
    </div>
  );
}