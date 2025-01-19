import { Router, Request, Response } from 'express';
import { supabase } from '../server';
import { authenticateUser } from '../middleware/auth';
import { Questionnaire } from '../types/questionnaire';

const router = Router();

router.post('/', authenticateUser, async (req: Request, res: Response) => {
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
});

router.get('/', authenticateUser, async (req: Request, res: Response) => {
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
});

export { router as questionnaireRouter };
