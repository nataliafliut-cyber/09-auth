import { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist in NoteHub.',
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/notes/filter/all" className={css.link}>
        Back to Home
      </Link>
    </div>
  );
}