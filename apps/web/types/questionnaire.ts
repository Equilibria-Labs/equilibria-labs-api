export interface BaseStep {
  id: string;
  type: string;
  title?: string;
  heading?: string;
  subheading?: string;
}

export interface Choice {
  id: string;
  text: string;
}

export interface MultipleChoiceStep extends BaseStep {
  type: 'multiple-choice-required' | 'multiple-choice-optional';
  choices: Choice[];
  minSelections?: number;
  maxSelections?: number;
}

export interface SingleChoiceStep extends BaseStep {
  type: 'single-choice';
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
  | MultipleChoiceStep
  | SingleChoiceStep
  | EducationalStep
  | MessageStep
  | ResultsStep;

export type QuestionnaireState = {
  currentStepIndex: number;
  answers: Record<string, string[]>;
};
