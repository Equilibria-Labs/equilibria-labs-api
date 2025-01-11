'use client';

import { useState } from 'react';
import { Questionnaire } from '@/components/questionnaire/questionnaire';
import { onboardingConfig } from '@/config/onboarding';

export default function Page() {
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
      steps={onboardingConfig.steps}
      onComplete={handleComplete}
      onStepComplete={handleStepComplete}
      answers={answers}
    />
  );
}
