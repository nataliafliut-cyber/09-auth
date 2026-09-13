import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';

export const fetchServerSession = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const response = await api.get<User>('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};