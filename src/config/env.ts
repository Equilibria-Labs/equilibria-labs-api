import { z } from 'zod';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().default('3001'),
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
});

// Add this for debugging
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SUPABASE_URL: process.env.SUPABASE_URL ? 'set' : 'not set',
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'set' : 'not set',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'set' : 'not set',
});

export const env = envSchema.parse(process.env);
