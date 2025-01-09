import { SingleChoiceStep as SingleChoiceStepType } from '@/types/questionnaire';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SingleChoiceStepProps {
  step: SingleChoiceStepType;
  value: string[];
  onChange: (value: string) => void;
  next: () => void;
}

export function SingleChoiceStep({
  step,
  value,
  onChange,
  next,
}: SingleChoiceStepProps) {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        {step.subtitle && (
          <div className='text-sm text-white/60'>{step.subtitle}</div>
        )}
        {step.title && <h2 className='text-2xl font-bold'>{step.title}</h2>}
      </div>

      <RadioGroup
        value={value[0]}
        onValueChange={onChange}
        className='space-y-3'
      >
        {step.choices.map(choice => (
          <div
            key={choice.id}
            className='flex items-center space-x-3 rounded-xl bg-white/10 p-4 cursor-pointer hover:bg-white/20 transition-colors'
            onClick={async () => {
              await onChange(choice.id);
              next();
            }}
          >
            <RadioGroupItem
              value={choice.id}
              id={choice.id}
              className='sr-only'
            />
            <Label
              htmlFor={choice.id}
              className='flex-1 cursor-pointer text-lg'
            >
              {choice.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
