import React from 'react';

interface ColumnProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
}

export default function Column({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-20 max-w-5xl p-5'>{children}</div>;
}
