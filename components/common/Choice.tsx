import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
    await onChange(choice.id);
    if (type === 'radio') {
      next();
    }
  };

  return (
    <div
      key={choice.id}
      className='flex items-center space-x-3 rounded-xl p-4 cursor-pointer hover:bg-white/20 transition-colors'
      onClick={handleClick}
    >
      {type === 'radio' ? (
        <RadioGroupItem value={choice.id} id={choice.id} className='sr-only' />
      ) : (
        <Checkbox
          id={choice.id}
          checked={checked}
          onCheckedChange={() => onChange(choice.id)}
          className='border-white data-[state=checked]:bg-white data-[state=checked]:text-[#7c3aed]'
        />
      )}
      <Label
        htmlFor={choice.id}
        className='flex-1 cursor-pointer text-lg'
        onClick={e => e.stopPropagation()}
      >
        {choice.text}
      </Label>
    </div>
  );
}
