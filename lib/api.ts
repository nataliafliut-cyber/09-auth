import axios from 'axios';
import { Note, CreateNoteDto } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page };

  if (search) {
    params.search = search;
  }

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

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