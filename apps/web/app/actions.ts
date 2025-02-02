'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/sign-up',
      'Email and password are required'
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect(
      'success',
      '/sign-up',
      'Thanks for signing up! Please check your email for a verification link.'
    );
  }
};

export const signInAction = async (formData: FormData) => {
  console.log('🟦 Starting signInAction');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  console.log('🟦 Attempting sign in for email:', email);
  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('🟦 Sign in response:', {
    session: signInData?.session ? 'Present' : 'Missing',
    error,
  });

  if (error) {
    console.log('🔴 Sign in error:', error.message);
    return encodedRedirect('error', '/sign-in', error.message);
  }

  if (!signInData.session) {
    console.log('🔴 Sign in error: No session returned');
    return encodedRedirect('error', '/sign-in', 'Authentication failed');
  }

  // Set the auth cookie using the cookies() API
  const cookieName = `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0].split('//')[1]}-auth-token`;
  const cookieValue = JSON.stringify({
    access_token: signInData.session.access_token,
    refresh_token: signInData.session.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week from now
    expires_in: 60 * 60 * 24 * 7, // 1 week
  });

  console.log('🟦 Setting cookie:', cookieName);
  cookies().set(cookieName, cookieValue, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  console.log('🟢 Sign in successful, redirecting to /protected');
  return redirect('/protected');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password'
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed'
    );
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};
