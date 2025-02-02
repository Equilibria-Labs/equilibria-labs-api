'use client';

import { useState } from 'react';
import { Questionnaire } from '../questionnaire/questionnaire';
import { welcomeConfig } from '@/config/welcome';

export default function Welcome() {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleComplete = (newAnswers: Record<string, string[]>) => {
    setAnswers(newAnswers);
    console.log('Questionnaire completed:', newAnswers);
  };

  const handleStepComplete = (stepId: string, answer: string[]) => {
    const updatedAnswers = {
      ...answers,
      [stepId]: answer,
    };
    setAnswers(updatedAnswers);
  };

  return (
    <Questionnaire
      steps={welcomeConfig.steps}
      onCompleteAction={handleComplete}
      onStepComplete={handleStepComplete}
      answers={answers}
      shouldShowProgress={false}
    />
  );
}
