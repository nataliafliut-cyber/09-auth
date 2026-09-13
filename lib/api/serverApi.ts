import { cookies } from 'next/headers';

export const fetchServerSession = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/session`, {
    headers: { Cookie: cookieString },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
};