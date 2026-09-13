import { api } from './api';
import { User } from '@/types/user';
import { Note, CreateNoteDto } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CredentialsDto {
  email: string;
  password: string;
}

export const login = async (data: CredentialsDto): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
};

export const register = async (data: CredentialsDto): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateUserProfile = async (data: { username: string }): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};

export const fetchNotes = async (page: number = 1, search: string = '', tag?: string): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };
  if (search) params.search = search;
  if (tag && tag !== 'all') params.tag = tag;
  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (dto: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', dto);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};