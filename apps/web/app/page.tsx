// import InsomniaQuiz from '../components/insomnia-severity-quiz/insomnia-severity-quiz';
import Welcome from '@/components/welcome/Welcome';

export default async function Home() {
  console.log('Home page rendering');
  // Add error boundary or try-catch if needed
  return (
    <>
      <Welcome />
    </>
  );
}
