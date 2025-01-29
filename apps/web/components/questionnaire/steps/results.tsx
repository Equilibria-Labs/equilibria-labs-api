import { ResultsStep as ResultsStepType } from '../../../types/questionnaire';
import { Button } from '../../../components/ui/button';
import { Clock, Calendar, Brain, Moon, AlertCircle } from 'lucide-react';

interface ResultsStepProps {
  step: ResultsStepType;
  answers: Record<string, string[]>;
}

const icons = {
  clock: Clock,
  calendar: Calendar,
  brain: Brain,
  moon: Moon,
  alert: AlertCircle,
};

function calculateResults(answers: Record<string, string[]>): {
  score: number;
  issues: { icon: string; text: string }[];
} {
  let score = 100;
  const issues: { icon: string; text: string }[] = [];
  score = 50;
  console.log(answers);

  // Example calculations based on answers
  // if (answers['sleep-worry'] && answers['sleep-worry'].includes('often')) {
  //   score -= 20;
  //   issues.push({ icon: 'brain', text: 'You often worry about your sleep' });
  // }

  // if (answers['sleep-reasons']) {
  //   if (answers['sleep-reasons'].includes('health')) {
  //     score -= 15;
  //     issues.push({ icon: 'alert', text: "You're worried about your health" });
  //   }
  //   if (answers['sleep-reasons'].includes('productivity')) {
  //     score -= 10;
  //     issues.push({
  //       icon: 'clock',
  //       text: 'You feel unproductive / ineffective',
  //     });
  //   }
  // }

  // Add more calculations based on other answers

  return { score: Math.max(score, 0), issues };
}

export function ResultsStep({ step, answers }: ResultsStepProps) {
  const { score, issues } = calculateResults(answers);
  console.log(step);
  console.log(answers);
  return (
    <div className='space-y-8'>
      <div className='relative p-8'>
        <svg className='w-full h-full' viewBox='0 0 100 100'>
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#4B5563'
            strokeWidth='10'
          />
          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='#EF4444'
            strokeWidth='10'
            strokeDasharray={`${score * 2.83} 283`}
            transform='rotate(-90 50 50)'
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
          <h2 className='text-4xl font-bold'>{score}%</h2>
          <p className='text-lg font-medium text-red-400'>Needs Work</p>
        </div>
      </div>

      <div className='space-y-6'>
        <h3 className='text-xl font-semibold'>
          Some of the sleep issues you told us about:
        </h3>
        <ul className='space-y-4'>
          {issues.map((issue, index) => {
            const Icon = icons[issue.icon as keyof typeof icons] || Moon;
            return (
              <li key={index} className='flex items-center space-x-3'>
                <Icon className='w-6 h-6 text-[#7c3aed]' />
                <span>{issue.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='text-center'>
        <p className='text-lg font-medium mb-4'>
          Based on your sleep profile, we are confident that your sleep issues
          can be solved in a lasting way!
        </p>
        <Button className='w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white'>
          Take Back My Sleep
        </Button>
      </div>
    </div>
  );
}
