// import InsomniaQuiz from '../components/insomnia-severity-quiz/insomnia-severity-quiz';
import Onboarding from '../components/onboarding/onboarding';

export default async function Home() {
  console.log('Home page rendering');
  // Add error boundary or try-catch if needed
  return (
    <>
      <main className='flex-1 flex flex-col gap-6 px-4'>
        <Onboarding />
      </main>
    </>
  );
}
