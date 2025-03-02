import { Router } from 'express';
import { supabase } from '../server';
import { authenticateUser } from '../middleware/auth';
import { Questionnaire } from '../types/questionnaire';
import type { RequestHandler } from 'express-serve-static-core';

interface QuestionnaireRequestBody {
  responses: unknown;
}

export type EmptyObject = Record<string, never>;

const router: Router = Router();

router.post('/', authenticateUser, (async (req, res) => {
  const { responses } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('questionnaires')
      .insert([
        {
          user_id: userId,
          responses,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.json(data as Questionnaire);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save questionnaire' });
  }
}) as RequestHandler<EmptyObject, unknown, QuestionnaireRequestBody>);

router.get('/', authenticateUser, (async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('questionnaires')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    res.json(data as Questionnaire[]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questionnaires' });
  }
}) as RequestHandler);

export { router as questionnaireRouter };
