import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile | Equilibria',
  description: 'View and manage your personal information',
};

export default function YouPage() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Your Profile</h1>

        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-xl font-semibold mb-4'>
            Here&apos;s what you&apos;ve told us about yourself
          </h2>

          {/* Placeholder content - replace with actual user data components */}
          <div className='space-y-4'>
            <p className='text-gray-600'>
              This page will show your personal information and preferences.
            </p>
            <div className='bg-gray-50 p-4 rounded'>
              <p className='text-sm text-gray-500'>
                Coming soon: View and manage your profile details, preferences,
                and activity history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
