export interface BaseStep {
  id: string;
  type: string;
}

export interface Choice {
  id: string;
  text: string;
}

export interface MessageWithImageStep extends BaseStep {
  type: 'message-with-image';
  title: string;
  message: string;
  imageUrl: string;
}

export interface MultipleChoiceStep extends BaseStep {
  type: 'multiple-choice-required' | 'multiple-choice-optional';
  title: string;
  subtitle?: string;
  choices: Choice[];
  minSelections?: number;
  maxSelections?: number;
}

export interface SingleChoiceStep extends BaseStep {
  type: 'single-choice';
  title: string;
  subtitle?: string;
  choices: Choice[];
}

export interface EducationalStep extends BaseStep {
  type: 'educational';
  fact: string;
  explanation: string;
  reference: string;
}

export interface MessageStep extends BaseStep {
  type: 'message';
  title: string;
  message: string;
  imageUrl?: string;
}

export interface ResultsIssue {
  icon: string;
  text: string;
}

export interface ResultsStep extends BaseStep {
  type: 'results';
  title: string;
  score: number;
  issues: ResultsIssue[];
  recommendation: string;
}

export type Step =
  | MessageWithImageStep
  | MultipleChoiceStep
  | SingleChoiceStep
  | EducationalStep
  | MessageStep
  | ResultsStep;

export type QuestionnaireState = {
  currentStepIndex: number;
  answers: Record<string, string[]>;
};
