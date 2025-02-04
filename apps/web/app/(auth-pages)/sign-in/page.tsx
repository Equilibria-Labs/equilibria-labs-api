import { Message } from '@/types/auth';
import { signInAction } from '@/app/actions';
import { FormMessage } from '@/components/account/form-message';
import { SubmitButton } from '@/components/account/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { processSearchParams } from '@/utils/search-params';

export default async function SignIn({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const message = await processSearchParams(searchParams);

  return (
    <form className='flex-1 flex flex-col min-w-64'>
      <h1 className='text-2xl font-medium'>Sign in</h1>
      <p className='text-sm text-foreground'>
        Don&apos;t have an account?{' '}
        <Link className='text-foreground font-medium underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
      <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' placeholder='you@example.com' required />
        <div className='flex justify-between items-center'>
          <Label htmlFor='password'>Password</Label>
          <Link
            className='text-xs text-foreground underline'
            href='/forgot-password'
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type='password'
          name='password'
          placeholder='Your password'
          required
        />
        <SubmitButton pendingText='Signing In...' formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={message} />
      </div>
    </form>
  );
}
