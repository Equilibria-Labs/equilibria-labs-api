import { SingleChoiceStep as SingleChoiceStepType } from '../../../types/questionnaire';
import { RadioGroup } from '../../../components/ui/radio-group';
import { Choice } from '../../../components/common/Choice';
import { Heading, HeadingSmall } from '../../../components/common/Typography';

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
        {step.subtitle && <HeadingSmall>{step.subtitle}</HeadingSmall>}
        {step.title && <Heading>{step.title}</Heading>}
      </div>

      <RadioGroup
        value={value[0]}
        onValueChange={onChange}
        className='space-y-3'
      >
        {step.choices.map(choice => (
          <Choice
            key={choice.id}
            choice={choice}
            onChange={onChange}
            next={next}
            type='radio'
          />
        ))}
      </RadioGroup>
    </div>
  );
}
