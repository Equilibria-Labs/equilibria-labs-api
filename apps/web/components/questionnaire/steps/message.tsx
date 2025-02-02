import { MessageStep as MessageStepType } from '@/types/questionnaire';
import Image from 'next/image';
import {
  HeadingSmall,
  Heading,
  HeadingLarge,
  BodyText,
} from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

interface MessageStepProps {
  step: MessageStepType;
  next: () => void;
}

export function MessageStep({ step, next }: MessageStepProps) {
  return (
    <>
      {step.title && (
        <HeadingLarge className='text-center'>{step.title}</HeadingLarge>
      )}
      {step.heading && <Heading>{step.heading}</Heading>}
      {step.subheading && <HeadingSmall>{step.subheading}</HeadingSmall>}
      {step.message && <BodyText>{step.message}</BodyText>}
      {step.imageUrl && (
        <div className='relative w-full overflow-hidden'>
          <Image src={step.imageUrl} alt='' fill className='object-cover' />
        </div>
      )}
      <Button onClick={next} className='w-full'>
        Continue
      </Button>
    </>
  );
}
