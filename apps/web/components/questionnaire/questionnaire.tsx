'use client';

// import { useState, useEffect } from 'react';
import { useState } from 'react';
import { Step, QuestionnaireState } from '../../types';
import { SingleChoiceStep } from './steps/single-choice';
import { MultipleChoiceStep } from './steps/multiple-choice';
import { MessageStep } from './steps/message';
import { EducationalStep } from './steps/educational';
import { ResultsStep } from './steps/results';
// import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface QuestionnaireProps {
  steps: Step[];
  onCompleteAction: (answers: Record<string, string[]>) => void;
  onStepComplete: (stepId: string, answer: string[]) => void;
  answers: Record<string, string[]>;
}

export function Questionnaire({ steps, onCompleteAction }: QuestionnaireProps) {
  const [state, setState] = useState<QuestionnaireState>({
    currentStepIndex: 0,
    answers: {},
  });

  const currentStep = steps[state.currentStepIndex];

  const handleNext = () => {
    if (state.currentStepIndex < steps.length - 1) {
      setState(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex + 1,
      }));
    } else {
      // If it's the last step, move to the results
      const resultsStep = steps.findIndex(step => step.type === 'results');
      if (resultsStep !== -1) {
        setState(prev => ({ ...prev, currentStepIndex: resultsStep }));
      } else {
        onCompleteAction(state.answers);
      }
    }
  };

  const handleBack = () => {
    if (state.currentStepIndex > 0) {
      setState(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1,
      }));
    }
  };

  const handleAnswer = (stepId: string, answer: string[]) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [stepId]: answer },
    }));
  };

  const renderStep = () => {
    switch (currentStep.type) {
      case 'single-choice':
        return (
          <SingleChoiceStep
            step={currentStep}
            value={state.answers[currentStep.id] || []}
            onChange={value => handleAnswer(currentStep.id, [value])}
            next={handleNext}
          />
        );
      case 'multiple-choice-required':
      case 'multiple-choice-optional':
        return (
          <MultipleChoiceStep
            step={currentStep}
            initialValue={state.answers[currentStep.id] || []}
            onChange={value => handleAnswer(currentStep.id, value)}
            next={handleNext}
          />
        );
      case 'message':
      case 'message-with-image':
        return <MessageStep step={currentStep} next={handleNext} />;
      case 'educational':
        return <EducationalStep step={currentStep} next={handleNext} />;
      case 'results':
        return <ResultsStep step={currentStep} answers={state.answers} />;
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='container max-w-2xl mx-auto px-4 py-8'>
        <header className='flex items-center mb-8'>
          {state.currentStepIndex > 0 && currentStep.type !== 'results' && (
            <button
              onClick={handleBack}
              className='p-2 hover:bg-white/10 rounded-full transition-colors'
            >
              <ChevronLeft className='w-6 h-6' />
            </button>
          )}
          <h1 className='text-xl font-semibold mx-auto'>
            {currentStep.type === 'results'
              ? 'Your Sleep Profile'
              : 'Building Your Sleep Profile'}
          </h1>
        </header>

        {currentStep.type !== 'results' && (
          <div className='mb-6 h-1 rounded-full'>
            <div
              className='h-full rounded-full transition-all duration-300'
              style={{
                width: `${((state.currentStepIndex + 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        )}

        {renderStep()}
      </div>
    </div>
  );
}
