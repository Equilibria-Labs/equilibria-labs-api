import { Router } from 'express';
import type {
  Request,
  Response,
  ParamsDictionary,
} from 'express-serve-static-core';
import { supabase } from '../server';
import { authenticateUser } from '../middleware/auth';
import { Onboarding } from '../types/onboarding';

interface OnboardingRequestBody {
  responses: unknown;
  status: string;
  onboarding_type?: string;
  last_step?: string;
}

interface OnboardingUpdateBody {
  responses: unknown;
  status: string;
  last_step?: string;
}

const router: Router = Router();

router.post(
  '/',
  authenticateUser,
  async (
    req: Request<ParamsDictionary, Onboarding, OnboardingRequestBody>,
    res: Response
  ) => {
    const { responses, status, onboarding_type, last_step } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
      const { data, error } = await supabase
        .from('onboarding')
        .insert([
          {
            user_id: userId,
            responses,
            status,
            onboarding_type,
            last_step,
            completed_at:
              status === 'completed' ? new Date().toISOString() : null,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return res.json(data as Onboarding);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save onboarding' });
    }
  }
);

router.put(
  '/:id',
  authenticateUser,
  async (
    req: Request<{ id: string }, Onboarding, OnboardingUpdateBody>,
    res: Response
  ) => {
    const { responses, status, last_step } = req.body;
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
      const { data, error } = await supabase
        .from('onboarding')
        .update({
          responses,
          status,
          last_step,
          completed_at:
            status === 'completed' ? new Date().toISOString() : null,
        })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return res.json(data as Onboarding);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update onboarding' });
    }
  }
);

router.get('/', authenticateUser, async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('onboarding')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.json(data as Onboarding[]);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch onboarding data' });
  }
});

router.get('/latest', authenticateUser, async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('onboarding')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return res.json(data as Onboarding);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch latest onboarding' });
  }
});

export { router as onboardingRouter };
