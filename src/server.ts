import express, { Express } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { aiRouter } from './routes/ai';
import { onboardingRouter } from './routes/onboarding';
import { dialogueRouter } from './routes/dialogue';
import { questionnaireRouter } from './routes/questionnaire';

const app: Express = express();

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY
);

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Export Swagger specification as JSON for AI context
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/ai', aiRouter);
app.use('/api/onboarding', onboardingRouter);
app.use('/api/dialogues', dialogueRouter);
app.use('/api/questionnaires', questionnaireRouter);

export { app };
