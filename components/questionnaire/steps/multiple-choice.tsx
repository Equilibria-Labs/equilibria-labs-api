// import { useState, useEffect } from 'react';
import { useState } from 'react';
import { MultipleChoiceStep as MultipleChoiceStepType } from '@/types/questionnaire';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MultipleChoiceStepProps {
  step: MultipleChoiceStepType;
  initialValue: string[];
  onChange: (value: string[]) => void;
  next: () => void;
}

export function MultipleChoiceStep({
  step,
  initialValue,
  onChange,
  next,
}: MultipleChoiceStepProps) {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(initialValue);

  // useEffect(() => {
  //   onChange(selectedOptions)
  // }, [selectedOptions, onChange])

  const handleToggle = (choiceId: string) => {
    const newSelection =
      choiceId === 'none'
        ? selectedOptions.includes('none')
          ? []
          : ['none']
        : selectedOptions.includes(choiceId)
          ? selectedOptions.filter(id => id !== choiceId)
          : [...selectedOptions.filter(id => id !== 'none'), choiceId];

    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  const isValid =
    step.type === 'multiple-choice-optional' ||
    (selectedOptions.length >= (step.minSelections || 1) &&
      selectedOptions.length <= (step.maxSelections || step.choices.length));

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        {step.subtitle && (
          <div className='text-sm text-white/60'>{step.subtitle}</div>
        )}
        {step.title && <h2 className='text-2xl font-bold'>{step.title}</h2>}
      </div>

      <div className='space-y-3'>
        {step.choices.map(choice => (
          <div
            key={choice.id}
            className={`flex items-center space-x-3 rounded-xl p-4 cursor-pointer transition-colors
              ${
                selectedOptions.includes(choice.id)
                  ? 'bg-[#7c3aed] text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            onClick={() => handleToggle(choice.id)}
          >
            <Checkbox
              id={choice.id}
              checked={selectedOptions.includes(choice.id)}
              onCheckedChange={() => handleToggle(choice.id)}
              className='border-white data-[state=checked]:bg-white data-[state=checked]:text-[#7c3aed]'
            />
            <Label
              htmlFor={choice.id}
              className='flex-1 cursor-pointer text-lg'
            >
              {choice.text}
            </Label>
          </div>
        ))}
      </div>

      {!isValid && (
        <p className='text-sm text-red-400'>
          Please select{' '}
          {step.minSelections === 1
            ? 'an option'
            : `${step.minSelections} options`}
        </p>
      )}

      <Button
        onClick={next}
        className='w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white'
        disabled={!isValid}
      >
        Continue
      </Button>
    </div>
  );
}
