import express, { Express } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { env } from './config/env';
import { aiRouter } from './routes/ai';
import { onboardingRouter } from './routes/onboarding';

const app: Express = express();

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY
);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiRouter);
app.use('/api/onboarding', onboardingRouter);

export { app };
