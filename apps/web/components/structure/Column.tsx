import React from 'react';

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
}

export default function Column({
  children,
  className = '',
  hasNoGap = false,
}: ColumnProps) {
  return (
    <div
      className={`flex flex-col ${!hasNoGap ? 'gap-4' : ''} max-w-5xl p-5 ${className}`}
    >
      {children}
    </div>
  );
}
