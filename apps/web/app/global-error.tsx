'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <h2 className='text-2xl mb-4'>Something went wrong!</h2>
          <button
            className='px-4 py-2 bg-primary text-white rounded'
            onClick={() => reset()}
          >
            Try again
          </button>
          {process.env.NODE_ENV === 'development' && (
            <pre className='mt-4 text-sm text-red-500'>
              {error.message}
              {error.stack}
            </pre>
          )}
        </div>
      </body>
    </html>
  );
}
