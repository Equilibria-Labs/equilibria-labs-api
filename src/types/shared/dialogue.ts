/**
 * WARNING: This type must be manually kept in sync with the backend.
 * If you modify this type, ensure the corresponding backend type is updated as well.
 */

export interface BaseStep {
  step_id: string;
  type: string;
  title?: string;
  question?: string;
  instruction?: string;
  description?: string;
  reference?: string | null;
}

export type ChoiceValue = {
  string_value?: string;
  numeric_value?: number;
};

export interface Choice {
  choice_id: string;
  text: string;
  value: ChoiceValue;
}

export interface QuestionStep extends BaseStep {
  question_id: string;
  choices: Choice[];
}

export type Answer = {
  step: QuestionStep;
  value: ChoiceValue[];
};

export type Dialogue = {
  dialogue_id: string; // Type of dialogue (e.g., 'isi', 'psqi')
  submission_id?: string; // Unique identifier for each submission
  title: string;
  version: string;
  status: 'not_started' | 'in_progress' | 'complete' | 'submitted';
  submitted_at?: string; // ISO timestamp
  created_at?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
  answers: Answer[];
  score?: number;
};
