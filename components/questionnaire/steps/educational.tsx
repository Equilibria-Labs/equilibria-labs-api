import { EducationalStep as EducationalStepType } from '@/types/questionnaire';
import { Button } from '@/components/ui/button';

interface EducationalStepProps {
  step: EducationalStepType;
  next: () => void;
}

export function EducationalStep({ step, next }: EducationalStepProps) {
  return (
    <div className='space-y-6'>
      <div className='inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#7c3aed] text-[#7c3aed]'>
        <span className='text-lg'>💡</span>
        <span className='font-medium'>Did you know?</span>
      </div>

      <h2 className='text-2xl font-bold'>{step.fact}</h2>
      <p className='text-lg leading-relaxed text-white/80'>
        {step.explanation}
      </p>

      {step.reference && (
        <p className='text-sm text-white/60'>{step.reference}</p>
      )}
      <Button onClick={next} className='w-full'>
        Continue
      </Button>
    </div>
  );
}
