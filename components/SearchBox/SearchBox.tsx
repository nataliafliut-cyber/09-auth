'use client';

import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search notes..."
      className={css.input}
    />
  );
}