// This check can be removed
// it is just for tutorial purposes

export function checkEnvironmentVariables() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(
        `Missing required environment variable: ${envVar}\n` +
          "Check your Supabase project's API settings to find these values:\n" +
          'https://supabase.com/dashboard/project/_/settings/api'
      );
    }
  }
}
