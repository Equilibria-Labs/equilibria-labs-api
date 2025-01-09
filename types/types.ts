export type QuestionType =
  | 'single-choice'
  | 'multiple-choice-required'
  | 'multiple-choice-optional'
  | 'message'
  | 'message-with-image'
  | 'educational'
  | 'results';

export type Choice = {
  id: string;
  text: string;
};

export type BaseStep = {
  id: string;
  type: QuestionType;
  title?: string;
  subtitle?: string;
};

export type SingleChoiceStep = BaseStep & {
  type: 'single-choice';
  choices: Choice[];
};

export type MultipleChoiceStep = BaseStep & {
  type: 'multiple-choice-required' | 'multiple-choice-optional';
  choices: Choice[];
  minSelections?: number;
  maxSelections?: number;
};

export type MessageStep = BaseStep & {
  type: 'message' | 'message-with-image';
  message: string;
  imageUrl?: string;
};

export type EducationalStep = BaseStep & {
  type: 'educational';
  fact: string;
  explanation: string;
  reference?: string;
};

export type ResultsStep = BaseStep & {
  type: 'results';
  score: number;
  issues: Array<{
    icon: string;
    text: string;
  }>;
  recommendation: string;
};

export type Step =
  | SingleChoiceStep
  | MultipleChoiceStep
  | MessageStep
  | EducationalStep
  | ResultsStep;

export type QuestionnaireState = {
  currentStepIndex: number;
  answers: Record<string, string[]>;
};
