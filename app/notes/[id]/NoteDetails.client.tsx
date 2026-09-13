'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading note details...</p>;
  if (isError || !note) return <p>Failed to load note details.</p>;

  return (
    <div className={css.container}>
      <article className={css.note}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created at: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </article>
    </div>
  );
}