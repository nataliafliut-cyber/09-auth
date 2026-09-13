'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, username });
      router.push('/profile');
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Edytuj profil</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>
          Nazwa użytkownika:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={css.input}
          />
        </label>
        <div className={css.buttonGroup}>
          <button type="submit" className={css.saveButton}>
            Zapisz zmiany
          </button>
          <Link href="/profile" className={css.cancelButton}>
            Anuluj
          </Link>
        </div>
      </form>
    </div>
  );
}