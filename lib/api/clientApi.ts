import { api } from './api';
import { User } from '@/types/user';

export const clientLogin = async (data: any) => {
  const res = await api.post('/api/auth/login', data);
  return res.data;
};

export const clientRegister = async (data: any) => {
  const res = await api.post('/api/auth/register', data);
  return res.data;
};

export const clientLogout = async () => {
  await api.post('/api/auth/logout');
};

export const getSession = async (): Promise<User | null> => {
  const res = await api.get('/api/auth/session');
  return res.data;
};