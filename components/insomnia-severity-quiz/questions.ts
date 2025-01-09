import { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Rate your difficulty in falling asleep in the past week',
    options: ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
  },
  {
    id: 2,
    text: 'Rate your difficulty staying asleep in the past week',
    options: ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
  },
  {
    id: 3,
    text: 'Rate your problems with waking up too early in the past week',
    options: ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'],
  },
  {
    id: 4,
    text: 'How satisfied/dissatisfied are you with your sleep pattern in the last 2 weeks?',
    options: [
      'Very Satisfied',
      'Satisfied',
      'Moderately Satisfied',
      'Dissatisfied',
      'Very Dissatisfied',
    ],
  },
  {
    id: 5,
    text: 'How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?',
    options: [
      'Not at all Noticeable',
      'A Little',
      'Somewhat',
      'Much',
      'Very Much Noticeable',
    ],
  },
  {
    id: 6,
    text: 'How worried/distressed are you about your current sleep problem?',
    options: [
      'Not at all Worried',
      'A Little',
      'Somewhat',
      'Much',
      'Very Much Worried',
    ],
  },
  {
    id: 7,
    text: 'To what extent do you consider your sleep problem to interfere with your daily functioning (e.g. ability to function at work) in the last 2 weeks?',
    options: [
      'Not at all Interfering',
      'A Little',
      'Somewhat',
      'Much',
      'Very Much Interfering',
    ],
  },
];
