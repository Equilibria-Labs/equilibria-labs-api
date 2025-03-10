import { Router } from 'express';
import OpenAI from 'openai';
import { env } from '../config/env';
import { authenticateUser } from '../middleware/auth';

const router: Router = Router();
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

router.post('/chat', authenticateUser, async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
    });

    res.json(completion.choices[0].message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

router.post('/test', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say hello!' }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

export { router as aiRouter };
