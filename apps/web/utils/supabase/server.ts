import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { checkEnvironmentVariables } from './check-env-vars';
import { Database } from '../../types/supabase';

export const createClient = async () => {
  checkEnvironmentVariables();
  console.log(
    '🟪 Creating Supabase client with URL:',
    process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 20) + '...'
  );

  const cookieStore = await cookies();
  console.log(
    '🟪 Available cookies:',
    Array.from(cookieStore.getAll()).map(c => c.name)
  );

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(
          name: string,
          value: string,
          options: Omit<ResponseCookie, 'name' | 'value'>
        ) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: Omit<ResponseCookie, 'name' | 'value'>) {
          try {
            cookieStore.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
