import { Result } from './types';

export function calculateISI(answers: number[]): Result {
  const score = answers.reduce((sum, value) => sum + value, 0);

  if (score <= 7) {
    return {
      score,
      severity: 'No clinically significant insomnia',
      description: 'Your sleep patterns appear to be normal.',
    };
  } else if (score <= 14) {
    return {
      score,
      severity: 'Subthreshold insomnia',
      description: 'You may be experiencing mild sleep difficulties.',
    };
  } else if (score <= 21) {
    return {
      score,
      severity: 'Moderate clinical insomnia',
      description: 'You appear to be experiencing moderate insomnia symptoms.',
    };
  } else {
    return {
      score,
      severity: 'Severe clinical insomnia',
      description: 'You appear to be experiencing severe insomnia symptoms.',
    };
  }
}
