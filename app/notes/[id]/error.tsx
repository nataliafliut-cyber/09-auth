'use client';

import React from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteError({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2>Failed to load note</h2>
      <p style={{ color: '#e53e3e', marginBottom: '16px' }}>
        {error.message || 'Something went wrong while fetching the note.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#3182ce',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}