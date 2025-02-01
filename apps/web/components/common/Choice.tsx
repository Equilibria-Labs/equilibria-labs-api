import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LabelText } from '@/components/common/Typography';
import { Check } from 'lucide-react';

interface ChoiceProps {
  choice: {
    id: string;
    text: string;
  };
  onChange: (value: string) => void;
  next: () => void;
  type: 'radio' | 'checkbox';
  checked?: boolean; // Optional prop for checkbox
}

export function Choice({ choice, onChange, next, type, checked }: ChoiceProps) {
  const handleClick = async () => {
    if (type === 'checkbox') {
      await onChange(choice.id);
    } else if (type === 'radio') {
      await onChange(choice.id);
      next();
    }
  };

  return (
    <div
      key={choice.id}
      className={`relative flex items-center justify-between rounded-xl p-4 cursor-pointer transition-colors ${
        checked ? 'bg-primary' : 'bg-secondary/75 hover:bg-secondary/50'
      }`}
    >
      <div className='absolute inset-0 z-10' onClick={handleClick} />
      {type === 'radio' ? (
        <RadioGroupItem value={choice.id} id={choice.id} className='sr-only' />
      ) : (
        <Checkbox
          id={choice.id}
          checked={checked}
          onCheckedChange={() => onChange(choice.id)}
          className='hidden' // Hide the checkbox
        />
      )}
      <Label htmlFor={choice.id} className='flex-1 cursor-pointer text-lg'>
        <LabelText>{choice.text}</LabelText>
      </Label>
      {checked && <Check className='w-6 h-6 text-white' aria-hidden='true' />}
    </div>
  );
}
