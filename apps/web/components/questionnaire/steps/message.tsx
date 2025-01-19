import {
  MessageStep as MessageStepType,
  MessageWithImageStep,
} from '@/types/questionnaire';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface MessageStepProps {
  step: MessageStepType | MessageWithImageStep;
  next: () => void;
}

export function MessageStep({ step, next }: MessageStepProps) {
  return (
    <div className='space-y-6'>
      {step.title && <h2 className='text-2xl font-bold'>{step.title}</h2>}
      <p className='text-lg leading-relaxed'>{step.message}</p>
      {step.imageUrl && (
        <div className='relative h-64 w-full rounded-xl overflow-hidden'>
          <Image src={step.imageUrl} alt='' fill className='object-cover' />
        </div>
      )}
      <Button onClick={next} className='w-full'>
        Continue
      </Button>
    </div>
  );
}
