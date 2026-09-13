import { Metadata } from 'next';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || 'all';
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${capitalizedTag} Notes | NoteHub`,
    description: `Browse all notes filtered by category: ${capitalizedTag}.`,
    openGraph: {
      title: `${capitalizedTag} Notes | NoteHub`,
      description: `Browse all notes filtered by category: ${capitalizedTag}.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub Open Graph Image',
        },
      ],
    },
  };
}

export default async function NotesFilterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}