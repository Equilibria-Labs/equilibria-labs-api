import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { checkEnvironmentVariables } from './check-env-vars';
import { Database } from '../../types/supabase';

export async function createClient() {
  checkEnvironmentVariables();
  console.log(
    '🟪 Creating Supabase client with URL:',
    process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 20) + '...'
  );

  const cookieStore = cookies();
  console.log('🟪 Available cookies:', 
    Array.from(cookieStore.getAll()).map(c => c.name)
  );

  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  });
}
