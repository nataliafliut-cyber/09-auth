import { fetchServerSession } from '@/lib/api/serverApi';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'View and manage your user profile details.',
};

export default async function ProfilePage() {
  let user = null;
  try {
    const response = await fetchServerSession();
    user = response.data;
  } catch (error) {
    // obsługa błędu sesji
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          {user.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={100}
              height={100}
            />
          )}
          <p>Username: {user.username || user.email}</p>
          <p>Email: {user.email}</p>
          <Link href="/profile/edit">Edit Profile</Link>
        </div>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  );
}