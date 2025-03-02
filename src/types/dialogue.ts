import { Dialogue, Answer } from './shared/dialogue';

/**
 * Database record type for the dialogues table.
 * This represents how the data is stored in the database.
 */
export interface DialogueRecord {
  id: string;
  user_id: string;
  dialogue_id: string;
  title: string;
  version: string;
  status: 'not_started' | 'in_progress' | 'complete' | 'submitted';
  answers: Answer[];
  score?: number;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert a database record to the shared Dialogue type
 */
export function toSharedDialogue(record: DialogueRecord): Dialogue {
  return {
    dialogueId: record.dialogue_id,
    title: record.title,
    version: record.version,
    status: record.status,
    submitted_at: record.submitted_at,
    created_at: record.created_at,
    updated_at: record.updated_at,
    answers: record.answers,
    score: record.score,
  };
}

/**
 * Convert a shared Dialogue to database fields
 */
export function fromSharedDialogue(
  dialogue: Dialogue
): Omit<DialogueRecord, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  return {
    dialogue_id: dialogue.dialogueId,
    title: dialogue.title,
    version: dialogue.version,
    status: dialogue.status,
    answers: dialogue.answers,
    score: dialogue.score,
    submitted_at: dialogue.submitted_at,
  };
}
