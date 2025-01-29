import { OnboardingConfig } from '../types';

export const onboardingConfig: OnboardingConfig = {
  steps: [
    {
      id: 'intro',
      type: 'message-with-image',
      title: 'Learn how to sleep again',
      message:
        'Get more deep sleep without pills using techniques from Stanford Sleep Clinic',
      imageUrl: '/placeholder.svg?height=300&width=600',
    },
    {
      id: 'sleep-goals',
      type: 'multiple-choice-required',
      title: 'Pick your sleep goals',
      subtitle: '(Select all that apply)',
      choices: [
        { id: 'fall-asleep', text: 'Fall asleep faster' },
        { id: 'sleep-through', text: 'Sleep through the night' },
        { id: 'deep-sleep', text: 'Get more deep sleep' },
      ],
      minSelections: 1,
    },
    {
      id: 'age-group',
      type: 'single-choice',
      title: 'What is your age group?',
      subtitle: 'Sleep needs change over time.',
      choices: [
        { id: 'under-18', text: 'Under 18' },
        { id: '18-29', text: '18-29' },
        { id: '30s', text: '30s' },
        { id: '40s', text: '40s' },
        { id: '50s', text: '50s' },
        { id: '60s', text: '60s' },
        { id: '70-plus', text: '70s or over' },
      ],
    },
    {
      id: 'wake-up-frequency',
      type: 'single-choice',
      title: 'How often do you wake up in the middle of the night?',
      choices: [
        { id: 'every-night', text: 'Every night' },
        { id: 'several-times', text: 'Several times a week' },
        { id: 'once-or-less', text: 'Once a week or less' },
      ],
    },
    {
      id: 'bathroom-wakeup',
      type: 'single-choice',
      title: 'Do you often wake up to go to the bathroom?',
      choices: [
        { id: 'always', text: 'Always' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'fall-back-asleep',
      type: 'single-choice',
      title: 'After you wake up at night, do you struggle to fall back asleep?',
      choices: [
        { id: 'every-time', text: 'Every time' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'awake-in-bed',
      type: 'single-choice',
      title: 'On an average night, how long are you awake in bed?',
      subtitle: 'Include the time it takes you to fall asleep',
      choices: [
        { id: '20-min', text: '20 minutes or less' },
        { id: '30-45-min', text: 'Between 30 - 45 mins' },
        { id: '1-2-hours', text: 'Between 1 - 2 hours' },
        { id: 'over-2-hours', text: 'Over 2 hours' },
      ],
    },
    {
      id: 'interrupted-sleep',
      type: 'message-with-image',
      title: 'Interrupted sleep is exhausting.',
      message:
        'Our tailored approach helps you get the deep, uninterrupted sleep you deserve.',
      imageUrl: '/placeholder.svg?height=300&width=600',
    },
    {
      id: 'sleep-hours',
      type: 'single-choice',
      title: 'How many hours of sleep do you typically get per night?',
      subtitle: 'An estimate for the last week will do!',
      choices: [
        { id: '4', text: '4 hours or less' },
        { id: '5', text: '5 hours' },
        { id: '6', text: '6 hours' },
        { id: '7', text: '7 hours' },
        { id: '8', text: '8 hours' },
        { id: '9', text: '9 hours or more' },
      ],
    },
    {
      id: 'sleep-worry',
      type: 'single-choice',
      title: "Do you worry about how much sleep you're getting?",
      subtitle: 'Good to know!',
      choices: [
        { id: 'often', text: 'Often' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'sleep-myth',
      type: 'educational',
      fact: "You may have heard that all adults need 8 hours of sleep nightly, but it's a myth.",
      explanation:
        "Everyone's sleep needs are different, and the quality of your sleep often matters more than the quantity. We'll help you discover what works best for you.",
      reference: '1',
    },
    {
      id: 'racing-thoughts',
      type: 'single-choice',
      title: 'Do racing thoughts keep you up at night?',
      choices: [
        { id: 'often', text: 'Often' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'sleep-issues-duration',
      type: 'single-choice',
      title: 'How long have sleep issues affected you?',
      choices: [
        { id: 'less-than-year', text: 'Less than a year' },
        { id: 'about-year', text: 'About a year' },
        { id: 'several-years', text: 'Several years' },
        { id: 'entire-life', text: 'My entire life' },
      ],
    },
    {
      id: 'sleep-solution-reasons',
      type: 'multiple-choice-required',
      title: 'Why are you seeking a sleep solution?',
      subtitle: 'Select all that apply:',
      choices: [
        { id: 'health', text: "I'm worried about my health" },
        { id: 'productivity', text: 'I feel unproductive / ineffective' },
        { id: 'mood', text: 'I feel irritable and moody' },
        { id: 'self', text: "I don't feel like myself" },
        { id: 'nothing-worked', text: 'Nothing else has worked for me' },
        { id: 'none', text: 'None of the above' },
      ],
      minSelections: 1,
    },
    {
      id: 'sleep-quality-rating',
      type: 'single-choice',
      title:
        'Over the past two weeks, how would you rate the quality of your sleep?',
      choices: [
        { id: 'good', text: 'Good' },
        { id: 'okay', text: 'Okay' },
        { id: 'poor', text: 'Poor' },
        { id: 'very-poor', text: 'Very Poor' },
        { id: 'unsure', text: 'Unsure' },
      ],
    },
    {
      id: 'recent-experiences',
      type: 'multiple-choice-optional',
      title:
        "Which of these best describes what you've been experiencing recently?",
      subtitle: 'Select all that apply:',
      choices: [
        { id: 'stay-up-late', text: 'I often stay up too late' },
        { id: 'work-stress', text: 'Work stress' },
        { id: 'health-issues', text: 'Health issues, injury or disease' },
        { id: 'hormonal-imbalance', text: 'Hormonal imbalance' },
        { id: 'family-stress', text: 'Family stress' },
        { id: 'move-relocation', text: 'Move or relocation' },
      ],
    },
    {
      id: 'sleep-importance',
      type: 'educational',
      fact: 'Poor sleep can slow down recovery and weaken your immune system.',
      explanation:
        'Quality sleep releases hormones that repair your body and strengthen immune cells. Improving your sleep helps you recover faster and feel your best.',
      reference: 'Mayo Foundation for Medical Education & Research',
    },
    {
      id: 'consistent-bedtime',
      type: 'single-choice',
      title: 'Do you usually go to bed at the same time?',
      choices: [
        { id: 'most-of-time', text: 'Most of the time' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'stay-in-bed',
      type: 'single-choice',
      title:
        "True or false? If you have trouble falling asleep, it's best to stay in bed and wait until you get sleepy.",
      choices: [
        { id: 'true', text: 'True' },
        { id: 'false', text: 'False' },
      ],
    },
    {
      id: 'stay-in-bed-explanation',
      type: 'educational',
      fact: "Staying in bed when you can't sleep often makes things worse.",
      explanation:
        'Your Sleep Reset program will teach you strategies recommended by sleep doctors to rebuild the connection between your bed and sleep.',
      reference: 'Verywell Health, 2024',
    },
    {
      id: 'share-bed',
      type: 'single-choice',
      title: 'Do you share your bed with a partner?',
      choices: [
        { id: 'always', text: 'Always' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'sleep-disruptions',
      type: 'single-choice',
      title: 'Does noise, light, or temperature often disrupt your sleep?',
      choices: [
        { id: 'always', text: 'Always' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'sleep-tracker',
      type: 'single-choice',
      title: 'Do you wear a smartwatch or a sleep tracker?',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
      ],
    },
    {
      id: 'sleep-data-explanation',
      type: 'educational',
      fact: 'We make it simple by connecting with your sleep tracker to guide your progress and create personalized solutions.',
      explanation:
        'Your sleep data helps us tailor our recommendations and track your improvement over time.',
      reference: '',
    },
    {
      id: 'root-causes',
      type: 'single-choice',
      title: 'Do you want to understand the root causes of your sleep issues?',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
      ],
    },
    {
      id: 'sleep-impact',
      type: 'single-choice',
      title:
        "Do you find it difficult to get through the day after a poor night's sleep?",
      choices: [
        { id: 'often', text: 'Often' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'life-areas-affected',
      type: 'multiple-choice-required',
      title: 'Which parts of your life are most affected by poor sleep?',
      subtitle: 'Select all that apply:',
      choices: [
        { id: 'relationships', text: 'Relationships with family and friends' },
        { id: 'work', text: 'Work and career' },
        { id: 'health', text: 'Health, fitness and diet' },
        { id: 'hobbies', text: 'Hobbies and activities' },
        { id: 'other', text: 'Other' },
      ],
      minSelections: 1,
    },
    {
      id: 'mood-impact',
      type: 'single-choice',
      title:
        'Does poor sleep ever cause you to feel impatient, cranky, or unfriendly toward people you care about?',
      choices: [
        { id: 'often', text: 'Often' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'sleep-importance-relationships',
      type: 'educational',
      fact: 'Caring for your sleep means caring for your loved ones.',
      explanation:
        'Over 50% of adults report snapping at loved ones after poor sleep. Your personalized program will help improve both your sleep and your mood.',
      reference: 'American Psychological Society - Stress & Sleep',
    },
    {
      id: 'family-history',
      type: 'single-choice',
      title: "Is there a history of Alzheimer's or Parkinson's in your family?",
      subtitle: 'Sleep issues can increase health risks.',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
        { id: 'unsure', text: 'Unsure' },
      ],
    },
    {
      id: 'sleep-apnea',
      type: 'single-choice',
      title:
        'Have you been previously diagnosed with or treated for sleep apnea?',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
        { id: 'unsure', text: 'Unsure' },
      ],
    },
    {
      id: 'bedtime-stress',
      type: 'single-choice',
      title: 'Do you ever feel stressed at the thought of going to bed?',
      subtitle: 'Long-term sleep issues can lead to sleep anxiety.',
      choices: [
        { id: 'often', text: 'Often' },
        { id: 'sometimes', text: 'Sometimes' },
        { id: 'never', text: 'Never' },
      ],
    },
    {
      id: 'sleep-improvement-attempts',
      type: 'single-choice',
      title:
        '"I want to improve my sleep, but nothing I\'ve tried has worked in a lasting way."',
      subtitle: 'Do you relate to the statement above?',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
      ],
    },
    {
      id: 'previous-methods',
      type: 'multiple-choice-required',
      title: 'What have you tried to improve your sleep?',
      subtitle: 'Select all that apply:',
      choices: [
        { id: 'caffeine', text: 'Cutting caffeine' },
        { id: 'meditation', text: 'Meditation / Yoga' },
        { id: 'screen-time', text: 'Reducing screen time' },
        { id: 'supplements', text: 'Supplements (CBD, magnesium)' },
        { id: 'diet', text: 'Eating or drinking less at night' },
        { id: 'other', text: 'Other' },
      ],
      minSelections: 1,
    },
    {
      id: 'sleep-reset-intro',
      type: 'educational',
      fact: 'Sleep Reset is different.',
      explanation:
        'We create a personalized, structured plan tailored to your unique sleep challenges, using proven techniques from top sleep clinics like Stanford and Mayo Clinic.',
      reference: 'Stanford MEDICINE, MAYO CLINIC, HARVARD MEDICAL SCHOOL, NIH',
    },
    {
      id: 'cbti-familiarity',
      type: 'single-choice',
      title: 'How familiar are you with CBT-I?',
      subtitle:
        'Sleep Reset uses Cognitive Behavioral Therapy for Insomnia (CBT-I), a top recommendation from doctors.',
      choices: [
        { id: 'done-before', text: "I've done CBTI before" },
        { id: 'heard-of', text: 'Heard of it but never tried it' },
        { id: 'never-heard', text: 'Never heard of it' },
      ],
    },
    {
      id: 'sleep-expert-recommendation',
      type: 'single-choice',
      title:
        "After a poor night's sleep, which of these do sleep experts recommend?",
      choices: [
        { id: 'sleep-in', text: 'Sleep in to make up for lost sleep' },
        { id: 'earlier-bedtime', text: 'Go to bed earlier the next night' },
        { id: 'nap', text: 'Take a nap to make up for lost sleep' },
        { id: 'none', text: 'None of the above' },
      ],
    },
    {
      id: 'deeper-sleep-method',
      type: 'single-choice',
      title: "What's the most effective way to get deeper sleep?",
      choices: [
        { id: 'longer-bed', text: 'Stay in bed longer' },
        { id: 'melatonin', text: 'Use melatonin' },
        { id: 'adjust-schedule', text: 'Adjust your sleep schedule' },
        { id: 'all', text: 'All of the above' },
      ],
    },
    {
      id: 'program-excitement',
      type: 'multiple-choice-required',
      title: 'What are you most excited about with your personalized program?',
      subtitle: 'Select all that apply:',
      choices: [
        { id: 'uncover-causes', text: 'Uncover causes of my sleep issues' },
        { id: 'learn-ways', text: 'Learn proven ways to improve sleep' },
        { id: 'break-habits', text: 'Break habits that hurt sleep quality' },
        { id: 'build-habits', text: 'Build positive sleep habits' },
        { id: 'track-patterns', text: 'Track my sleep patterns' },
        { id: 'use-tools', text: 'Use proven tools to reset my sleep' },
        { id: 'none', text: 'None of the above' },
      ],
      minSelections: 1,
    },
    {
      id: 'readiness',
      type: 'single-choice',
      title: 'How ready do you feel to start improving your sleep?',
      choices: [
        { id: 'ready', text: "I'm ready" },
        { id: 'somewhat', text: 'Somewhat ready' },
        { id: 'not-ready', text: 'Not ready at all' },
        { id: 'unsure', text: 'Unsure' },
      ],
    },
    {
      id: 'heard-about',
      type: 'single-choice',
      title: 'Where did you first hear about Sleep Reset?',
      choices: [
        { id: 'healthcare', text: 'Healthcare professional' },
        { id: 'news', text: 'News, blog or article' },
        { id: 'google', text: 'Google' },
        { id: 'social-media', text: 'Social media' },
        { id: 'podcast', text: 'Podcast' },
        { id: 'friend-family', text: 'Friend or family member' },
        { id: 'app-store', text: 'App Store' },
        { id: 'other', text: 'Other' },
      ],
    },
    {
      id: 'insomnia-diagnosis',
      type: 'single-choice',
      title: 'Have you ever been diagnosed or treated for insomnia?',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
        { id: 'not-sure', text: 'Not Sure' },
      ],
    },
    {
      id: 'nightly-routine',
      type: 'single-choice',
      title: 'Do you have a nightly routine to wind down in the evenings?',
      choices: [
        { id: 'yes', text: 'Yes' },
        { id: 'no', text: 'No' },
        { id: 'unsure', text: 'Unsure' },
      ],
    },
    {
      id: 'create-profile',
      type: 'message',
      title:
        'Create your profile to get started on your journey to better sleep',
      message:
        'Sleep Reset ensures the confidentiality of your personal information. By clicking "Continue" you agree to receive emails from Sleep Reset and accept our Terms & Privacy Policy.',
    },
    {
      id: 'results',
      type: 'results',
      title: 'Your Sleep Quality',
      score: 38,
      issues: [
        { icon: 'clock', text: 'You only get 6 hours of sleep per night' },
        { icon: 'moon', text: 'You often wake up in middle of the night' },
        { icon: 'calendar', text: "You've struggled with sleep for a year" },
        { icon: 'brain', text: 'Poor sleep sometimes affects your mood' },
        { icon: 'alert', text: 'Racing thoughts sometimes keep you up' },
      ],
      recommendation:
        'Based on your sleep profile, we are confident that your sleep issues can be solved in a lasting way!',
    },
  ],
};
