'use client';

import React from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  forcePage?: number;
  onPageChange?: (selectedItem: number) => void;
}

export default function Pagination({
  pageCount,
  forcePage = 0,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <div className={css.pagination}>
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange && onPageChange(index)}
          disabled={forcePage === index}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}