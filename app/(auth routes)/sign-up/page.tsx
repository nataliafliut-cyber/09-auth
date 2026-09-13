'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clientRegister } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await clientRegister({ username, email, password });
      setUser(user);
      router.push('/profile');
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Błąd podczas rejestracji.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Rejestracja</h1>
      {error && <p className={css.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>
          Nazwa użytkownika:
          <input type="text" name="username" required className={css.input} />
        </label>
        <label className={css.label}>
          Email:
          <input type="email" name="email" required className={css.input} />
        </label>
        <label className={css.label}>
          Hasło:
          <input type="password" name="password" required className={css.input} />
        </label>
        <button type="submit" disabled={isLoading} className={css.button}>
          {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>
      <p className={css.text}>
        Masz już konto? <Link href="/sign-in">Zaloguj się</Link>
      </p>
    </div>
  );
}