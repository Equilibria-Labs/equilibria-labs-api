import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Easy Wins | Equilibria',
  description:
    'Quick actions you can take today to improve your financial well-being',
};

export default function EasyWinsPage() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Easy Wins</h1>

        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold mb-4'>
            Simple steps for financial progress
          </h2>

          <div className='space-y-6'>
            <div className='border-l-4 border-green-500 pl-4 py-2'>
              <h3 className='font-medium text-lg mb-2'>
                Start an Emergency Fund
              </h3>
              <p className='text-gray-600 mb-2'>
                Set aside a small amount each month for unexpected expenses.
                Even $50 per month can make a difference.
              </p>
              <button className='text-green-600 font-medium hover:text-green-700'>
                Get Started →
              </button>
            </div>

            <div className='border-l-4 border-blue-500 pl-4 py-2'>
              <h3 className='font-medium text-lg mb-2'>Review Subscriptions</h3>
              <p className='text-gray-600 mb-2'>
                Check your recurring payments and cancel unused subscriptions.
                This can save you hundreds annually.
              </p>
              <button className='text-blue-600 font-medium hover:text-blue-700'>
                Review Now →
              </button>
            </div>

            <div className='border-l-4 border-purple-500 pl-4 py-2'>
              <h3 className='font-medium text-lg mb-2'>
                Automate Your Savings
              </h3>
              <p className='text-gray-600 mb-2'>
                Set up automatic transfers to your savings account on payday.
                This makes saving effortless.
              </p>
              <button className='text-purple-600 font-medium hover:text-purple-700'>
                Set Up →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
