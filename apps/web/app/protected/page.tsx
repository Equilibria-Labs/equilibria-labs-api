import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { InfoIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  console.log('🟩 Protected Page: Starting render');
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('🟩 Protected Page: User:', user);

  console.log(
    '🟩 Protected Page: User status:',
    user ? 'Authenticated' : 'Not authenticated'
  );

  if (!user) {
    console.log('🟩 Protected Page: No user found, redirecting to /sign-in');
    return redirect('/sign-in');
  }

  console.log('🟩 Protected Page: Rendering for authenticated user');
  return (
    <div className='flex-1 w-full flex flex-col gap-12'>
      <div className='w-full'>
        <div className='bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center'>
          <InfoIcon size='16' strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className='flex flex-col gap-2 items-start'>
        <h2 className='font-bold text-2xl mb-4'>Your user details</h2>
        <pre className='text-xs font-mono p-3 rounded border max-h-32 overflow-auto'>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className='font-bold text-2xl mb-4'>Next steps</h2>
      </div>
    </div>
  );
}
