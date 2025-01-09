'use client';

import { useState } from 'react';
import { Questionnaire } from '@/components/questionnaire/questionnaire';

const steps = [
  {
    id: 'sleep-worry',
    type: 'single-choice' as const,
    title: "Do you worry about how much sleep you're getting?",
    choices: [
      { id: 'often', text: 'Often' },
      { id: 'sometimes', text: 'Sometimes' },
      { id: 'never', text: 'Never' },
    ],
  },
  {
    id: 'sleep-reasons',
    type: 'multiple-choice-required' as const,
    title: 'Why are you seeking a sleep solution?',
    subtitle: 'Select all that apply:',
    choices: [
      { id: 'health', text: "I'm worried about my health" },
      { id: 'productivity', text: 'I feel unproductive / ineffective' },
      { id: 'mood', text: 'I feel irritable and moody' },
      { id: 'self', text: "I don't feel like myself" },
      { id: 'other', text: 'Nothing else has worked for me' },
      { id: 'none', text: 'None of the above' },
    ],
    minSelections: 1,
  },
  {
    id: 'did-you-know',
    type: 'educational' as const,
    fact: "You may have heard that all adults need 8 hours of sleep nightly, but it's a myth.",
    explanation:
      "Everyone's sleep needs are different, and the quality of your sleep often matters more than the quantity.",
    reference: '1',
  },
  {
    id: 'results',
    type: 'results' as const,
    title: 'Your Sleep Profile',
    score: 0,
    issues: [
      {
        icon: '⚠️',
        text: 'Your sleep patterns may be affecting your well-being',
      },
    ],
    recommendation: 'Consider establishing a consistent sleep schedule',
  },
];

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
      steps={steps}
      onComplete={handleComplete}
      onStepComplete={handleStepComplete}
      answers={answers}
    />
  );
}
