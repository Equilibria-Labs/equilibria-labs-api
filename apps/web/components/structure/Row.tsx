import React from 'react';

interface RowProps {
  children: React.ReactNode;
  className?: string;
  hasNoGap?: boolean;
  isFullWidth?: boolean;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'center' | 'flex-end';
}

export default function Row({
  children,
  className = '',
  hasNoGap = false,
  isFullWidth = false,
  justify = 'flex-start',
  align = 'flex-start',
}: RowProps) {
  return (
    <div
      className={`grid grid-flow-col ${!hasNoGap ? 'gap-4' : ''} ${
        isFullWidth ? 'w-full' : 'max-w-5xl'
      } ${className}`}
      style={{
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
}
