import { Router } from 'express';
import type { RequestHandler } from 'express-serve-static-core';
import { supabase } from '../server';
import { authenticateUser } from '../middleware/auth';
import { Dialogue } from '../types/shared/dialogue';
import {
  DialogueRecord,
  fromSharedDialogue,
  toSharedDialogue,
} from '../types/dialogue';

interface DialogueRequestBody {
  dialogue: Dialogue;
}

export type EmptyObject = Record<string, never>;

const router: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Dialogue:
 *       type: object
 *       required:
 *         - dialogueId
 *         - title
 *         - version
 *         - status
 *         - answers
 *       properties:
 *         dialogueId:
 *           type: string
 *           description: Identifier for the type of dialogue (e.g., 'isi', 'psqi')
 *         submissionId:
 *           type: string
 *           description: Unique identifier for this specific dialogue submission
 *         title:
 *           type: string
 *           description: Title of the dialogue
 *         version:
 *           type: string
 *           description: Version of the dialogue
 *         status:
 *           type: string
 *           enum: [not_started, in_progress, complete, submitted]
 *           description: Status of the dialogue
 *         submitted_at:
 *           type: string
 *           format: date-time
 *           description: When the dialogue was submitted
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the dialogue was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: When the dialogue was last updated
 *         answers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               step:
 *                 type: object
 *                 properties:
 *                   stepId:
 *                     type: string
 *                   questionId:
 *                     type: string
 *                   type:
 *                     type: string
 *                   title:
 *                     type: string
 *                   question:
 *                     type: string
 *                   choices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         choiceId:
 *                           type: string
 *                         text:
 *                           type: string
 *                         value:
 *                           type: object
 *                           properties:
 *                             stringValue:
 *                               type: string
 *                             numericValue:
 *                               type: number
 *               value:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     stringValue:
 *                       type: string
 *                     numericValue:
 *                       type: number
 *         score:
 *           type: number
 *           description: Optional score for the dialogue
 *     DialogueRequest:
 *       type: object
 *       required:
 *         - dialogue
 *       properties:
 *         dialogue:
 *           $ref: '#/components/schemas/Dialogue'
 */

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
 *             $ref: '#/components/schemas/DialogueRequest'
 *     responses:
 *       200:
 *         description: The dialogue was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialogue'
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
    // Ensure submissionId exists - client should provide this
    if (!dialogue.submissionId) {
      return res.status(400).json({ error: 'submissionId is required' });
    }

    const dialogueRecord = {
      user_id: userId,
      ...fromSharedDialogue(dialogue),
    };

    const { data, error } = await supabase
      .from('dialogues')
      .insert([dialogueRecord])
      .select()
      .single();

    if (error) throw error;

    res.json(toSharedDialogue(data as DialogueRecord));
  } catch (error) {
    console.error('Error saving dialogue:', error);
    res.status(500).json({ error: 'Failed to save dialogue' });
  }
}) as RequestHandler<EmptyObject, unknown, DialogueRequestBody>);

/**
 * @swagger
 * /api/dialogues/{dialogueId}/{submissionId}:
 *   put:
 *     summary: Update an existing dialogue submission
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of dialogue to update
 *       - in: path
 *         name: submissionId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique ID of the submission to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DialogueRequest'
 *     responses:
 *       200:
 *         description: The dialogue was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dialogue'
 *       401:
 *         description: User not authenticated
 *       500:
 *         description: Failed to update dialogue
 */
router.put('/:dialogueId/:submissionId', authenticateUser, (async (
  req,
  res
) => {
  const { dialogue } = req.body;
  const { dialogueId, submissionId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const dialogueRecord = {
      ...fromSharedDialogue(dialogue),
      submitted_at:
        dialogue.status === 'submitted'
          ? new Date().toISOString()
          : dialogue.submitted_at,
    };

    const { data, error } = await supabase
      .from('dialogues')
      .update(dialogueRecord)
      .eq('dialogue_id', dialogueId)
      .eq('submission_id', submissionId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    res.json(toSharedDialogue(data as DialogueRecord));
  } catch (error) {
    console.error('Error updating dialogue:', error);
    res.status(500).json({ error: 'Failed to update dialogue' });
  }
}) as RequestHandler<{ dialogueId: string; submissionId: string }, unknown, DialogueRequestBody>);

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

    const dialogues = (data as DialogueRecord[]).map(toSharedDialogue);
    res.json(dialogues);
  } catch (error) {
    console.error('Error fetching dialogues:', error);
    res.status(500).json({ error: 'Failed to fetch dialogues' });
  }
}) as RequestHandler);

/**
 * @swagger
 * /api/dialogues/{dialogueId}:
 *   get:
 *     summary: Get a specific dialogue by ID
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogueId
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
router.get('/:dialogueId', authenticateUser, (async (req, res) => {
  const { dialogueId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('dialogue_id', dialogueId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json(toSharedDialogue(data as DialogueRecord));
  } catch (error) {
    console.error('Error fetching dialogue:', error);
    res.status(500).json({ error: 'Failed to fetch dialogue' });
  }
}) as RequestHandler<{ dialogueId: string }>);

/**
 * @swagger
 * /api/dialogues/{dialogueId}/{submissionId}:
 *   get:
 *     summary: Get a specific dialogue submission by ID
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogueId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the dialogue to get
 *       - in: path
 *         name: submissionId
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
router.get('/:dialogueId/:submissionId', authenticateUser, (async (
  req,
  res
) => {
  const { dialogueId, submissionId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('dialogue_id', dialogueId)
      .eq('submission_id', submissionId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    res.json(toSharedDialogue(data as DialogueRecord));
  } catch (error) {
    console.error('Error fetching dialogue submission:', error);
    res.status(500).json({ error: 'Failed to fetch dialogue submission' });
  }
}) as RequestHandler<{ dialogueId: string; submissionId: string }>);

/**
 * @swagger
 * /api/dialogues/type/{dialogueId}:
 *   get:
 *     summary: Get all submissions for a specific dialogue type
 *     tags: [Dialogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dialogueId
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
router.get('/type/:dialogueId', authenticateUser, (async (req, res) => {
  const { dialogueId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { data, error } = await supabase
      .from('dialogues')
      .select('*')
      .eq('dialogue_id', dialogueId)
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    const dialogues = data.map((record: DialogueRecord) =>
      toSharedDialogue(record)
    );
    res.json(dialogues);
  } catch (error) {
    console.error('Error fetching dialogue submissions:', error);
    res.status(500).json({ error: 'Failed to fetch dialogue submissions' });
  }
}) as RequestHandler<{ dialogueId: string }>);

export { router as dialogueRouter };
