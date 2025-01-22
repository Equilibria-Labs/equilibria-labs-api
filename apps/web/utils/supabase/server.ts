import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { checkEnvironmentVariables } from './check-env-vars';
import { Database } from '../../types/supabase';

export function createClient() {
  checkEnvironmentVariables();
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
