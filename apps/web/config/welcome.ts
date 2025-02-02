import { WelcomeConfig } from '../types';

export const welcomeConfig: WelcomeConfig = {
  steps: [
    {
      id: 'intro',
      type: 'message',
      title: "I'm Equilibria, you can call me Libby.",
      heading: 'Welcome to Equilibria',
      subheading: 'Your personalized sleep coach',
      message: "You're here to get better sleep, right?",
    },
    {
      id: 'sleep-goals',
      type: 'multiple-choice-required',
      heading: 'Pick your sleep goals',
      subheading: '(Select all that apply)',
      choices: [
        { id: 'fall-asleep', text: 'Fall asleep faster' },
        { id: 'sleep-through', text: 'Sleep through the night' },
        { id: 'deep-sleep', text: 'Get more deep sleep' },
      ],
      minSelections: 1,
    },
  ],
};
