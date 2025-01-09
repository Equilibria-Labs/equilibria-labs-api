/* eslint-disable @typescript-eslint/ban-types */
'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { questions } from './questions';
import { calculateISI } from './utils';
import { Result } from './types';

export default function InsomniaQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setResult(calculateISI(newAnswers));
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <Card className='w-full max-w-lg mx-auto'>
        <CardContent className='p-6 text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            Your Insomnia Severity Index
          </h2>
          <p className='text-gray-600 mb-8'>
            This is the most widely recognized screening tool to evaluate
            insomnia.
          </p>

          <div className='mb-8'>
            <div className='relative h-4 bg-gradient-to-r from-teal-400 via-yellow-400 to-red-400 rounded-full mb-2'>
              <div
                className='absolute -bottom-6 left-1/2 transform -translate-x-1/2'
                style={{ left: `${(result.score / 28) * 100}%` }}
              >
                <div className='w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black'></div>
              </div>
            </div>
            <div className='mt-8 text-4xl font-bold'>{result.score}</div>
          </div>

          <h3 className='text-xl font-semibold mb-4'>{result.severity}</h3>
          <p className='text-gray-600 mb-8'>{result.description}</p>

          <Button
            onClick={handleReset}
            className='w-full bg-orange-500 hover:bg-orange-600'
          >
            Take Test Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-lg mx-auto'>
      <CardContent className='p-6'>
        <div className='flex items-center mb-6'>
          {currentQuestion > 0 && (
            <Button
              variant='ghost'
              size='icon'
              onClick={handleBack}
              className='mr-2'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
          )}
          <div className='flex-1 text-center'>
            <span className='text-sm'>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-6'>
            {questions[currentQuestion].text}
          </h2>
          <div className='space-y-3'>
            {questions[currentQuestion].options.map(
              (option: string, index: number) => (
                <Button
                  key={index}
                  variant='secondary'
                  className='w-full justify-start text-left h-auto py-4 px-6'
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              )
            )}
          </div>
        </div>

        <div className='h-2 bg-gray-200 rounded-full'>
          <div
            className='h-2 bg-green-600 rounded-full transition-all duration-300'
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
