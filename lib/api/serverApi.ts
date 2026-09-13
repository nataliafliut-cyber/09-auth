import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesResponse } from './clientApi';
import { AxiosResponse } from 'axios';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const fetchServerSession = async (): Promise<AxiosResponse<User>> => {
  const config = await getAuthHeaders();
  return api.get<User>('/auth/session', config);
};

export const fetchNotes = async (page: number = 1, search: string = '', tag?: string): Promise<FetchNotesResponse> => {
  const config = await getAuthHeaders();
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;
  if (tag && tag !== 'all') params.tag = tag;
  const { data } = await api.get<FetchNotesResponse>('/notes', { ...config, params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const config = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, config);
  return data;
};