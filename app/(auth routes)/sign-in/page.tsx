'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clientLogin } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await clientLogin({ email, password });
      setUser(user);
      router.push('/profile');
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Nieprawidłowy email lub hasło.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Zaloguj się</h1>
      {error && <p className={css.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>
          Email:
          <input type="email" name="email" required className={css.input} />
        </label>
        <label className={css.label}>
          Hasło:
          <input type="password" name="password" required className={css.input} />
        </label>
        <button type="submit" disabled={isLoading} className={css.button}>
          {isLoading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
      <p className={css.text}>
        Nie masz konta? <Link href="/sign-up">Zarejestruj się</Link>
      </p>
    </div>
  );
}