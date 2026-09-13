'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUserProfile } from '@/lib/api/clientApi';
import { User } from '@/types/user';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user) as User | null;
  const setUser = useAuthStore((state) => state.setUser);
  
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        {user?.avatar && (
          <div>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={100}
              height={100}
            />
          </div>
        )}
        <div>
          <label>Email (read-only)</label>
          <input type="email" value={user?.email || ''} readOnly disabled />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="button" onClick={() => router.back()}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}