import { Router } from 'express';
import type { RequestHandler } from 'express-serve-static-core';
import { supabase } from '../server';
import { authenticateUser } from '../middleware/auth';
import { Dialogue } from '../types/shared/dialogue';

interface DialogueRequestBody {
  dialogue: Dialogue;
}

export type EmptyObject = Record<string, never>;

const router: Router = Router();

/**
 * @swagger
 * /api/dialogues:
 *   post:
 *     summary: Create a new dialogue
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dialogue]
 *             properties:
 *               dialogue:
 *                 $ref: '#/components/schemas/Dialogue'
 *     responses:
 *       200:
 *         description: The dialogue was successfully created
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to save dialogue
 */
router.post('/', authenticateUser, (async (req, res) => {
  const { dialogue } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    // Ensure submission_id exists - client should provide this
    if (!dialogue.submission_id) {
      return res.status(400).json({ error: 'submission_id is required' });
    }

    const dialogueRecord = {
      user_id: userId,
      ...dialogue,
    };

    const { data, error } = await supabase
      .from('dialogues')
      .insert([dialogueRecord])
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error saving dialogue:', error);
    res.status(500).json({ error: 'Failed to save dialogue' });
  }
}) as RequestHandler<EmptyObject, unknown, DialogueRequestBody>);

/**
 * @swagger
 * /api/dialogues/{dialogue_id}/{submission_id}:
 *   put:
 *     summary: Update an existing dialogue submission
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogue_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of dialogue to update
 *       - in: path
 *         name: submission_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the submission to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dialogue]
 *             properties:
 *               dialogue:
 *                 $ref: '#/components/schemas/Dialogue'
 *     responses:
 *       200:
 *         description: The dialogue was successfully updated
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to update dialogue
 */
router.put('/:dialogue_id/:submission_id', authenticateUser, (async (
  req,
  res
) => {
  const { dialogue } = req.body;
  const { dialogue_id, submission_id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const dialogueRecord = {
      ...dialogue,
      submitted_at:
        dialogue.status === 'submitted'
          ? new Date().toISOString()
          : dialogue.submitted_at,
    };

    const { data, error } = await supabase
      .from('dialogues')
      .update(dialogueRecord)
      .eq('dialogue_id', dialogue_id)
      .eq('submission_id', submission_id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating dialogue:', error);
    res.status(500).json({ error: 'Failed to update dialogue' });
  }
}) as RequestHandler<{ dialogue_id: string; submission_id: string }, unknown, DialogueRequestBody>);

/**
 * @swagger
 * /api/dialogues:
 *   get:
 *     summary: Get all dialogues for the authenticated user
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of dialogues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dialogue'
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to fetch dialogues
 */
router.get('/', authenticateUser, (async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching dialogues:', error);
    res.status(500).json({ error: 'Failed to fetch dialogues' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /api/dialogues/{dialogue_id}:
 *   get:
 *     summary: Get a specific dialogue by ID
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogue_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the dialogue to get
 *     responses:
 *       200:
 *         description: The dialogue
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialogue'
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to fetch dialogue
 */
router.get('/:dialogue_id', authenticateUser, (async (req, res) => {
  const { dialogue_id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('dialogue_id', dialogue_id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching dialogue:', error);
    res.status(500).json({ error: 'Failed to fetch dialogue' });
  }
}) as RequestHandler<{ dialogue_id: string }>);

/**
 * @swagger
 * /api/dialogues/{dialogue_id}/{submission_id}:
 *   get:
 *     summary: Get a specific dialogue submission by ID
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogue_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the dialogue to get
 *       - in: path
 *         name: submission_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the submission to get
 *     responses:
 *       200:
 *         description: The dialogue submission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialogue'
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to fetch dialogue submission
 */
router.get('/:dialogue_id/:submission_id', authenticateUser, (async (
  req,
  res
) => {
  const { dialogue_id, submission_id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('dialogue_id', dialogue_id)
      .eq('submission_id', submission_id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching dialogue submission:', error);
    res.status(500).json({ error: 'Failed to fetch dialogue submission' });
  }
}) as RequestHandler<{ dialogue_id: string; submission_id: string }>);

/**
 * @swagger
 * /api/dialogues/type/{dialogue_id}:
 *   get:
 *     summary: Get all submissions for a specific dialogue type
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogue_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of dialogue to get (e.g., 'isi', 'psqi')
 *     responses:
 *       200:
 *         description: List of dialogue submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dialogue'
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to fetch dialogue submissions
 */
router.get('/type/:dialogue_id', authenticateUser, (async (req, res) => {
  const { dialogue_id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('dialogue_id', dialogue_id)
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching dialogue submissions:', error);
    res.status(500).json({ error: 'Failed to fetch dialogue submissions' });
  }
}) as RequestHandler<{ dialogue_id: string }>);

export { router as dialogueRouter };
