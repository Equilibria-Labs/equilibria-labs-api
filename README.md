# The Sleep Lab by Equilibria Labs

[Visit The Sleep Lab](https://thesleeplab.app)

The Sleep Lab is a web application that helps users assess and improve their sleep quality using clinically validated tools and Cognitive Behavioral Therapy for Insomnia (CBT-i) techniques.

## Features

- **Sleep Assessments**: Evidence-based questionnaires including:
  - Insomnia Severity Index (ISI)
  - Pittsburgh Sleep Quality Index (PSQI)
  - Epworth Sleepiness Scale (ESS)

- **Personalized Reports**: AI-powered analysis of sleep patterns and personalized recommendations

- **CBT-i Integration**: Implementation of Cognitive Behavioral Therapy for Insomnia principles

- **Progress Tracking**: Monitor sleep improvements over time with detailed analytics

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase
- **AI**: Fine-tuned Mistral 8x7B model for personalized sleep consultations
- **Authentication**: Built-in auth system with email/password

## Project Structure

```
├── ai/                    # AI model training and prompts
├── app/                   # Next.js app directory
├── components/            # React components
├── config/               # Application configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

This project is proprietary software owned by Equilibria Labs.

## Contact

For support or inquiries, please contact us through [The Sleep Lab](https://thesleeplab.app).

## About Equilibria Labs

Equilibria Labs is dedicated to improving mental health through technology. The Sleep Lab is our flagship product focusing on evidence-based sleep improvement. 