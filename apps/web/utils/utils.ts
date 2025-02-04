import { redirect } from 'next/navigation';
import { Message } from '@/types/auth';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {Message} type - The type of message ('success', 'error', or 'message')
 * @param {string} path - The path to redirect to
 * @param {string} message - The message to be encoded and added as a query parameter
 */
export function encodedRedirect(
  type: 'success' | 'error' | 'message',
  path: string,
  message: string
) {
  const params = new URLSearchParams();
  params.set(type, message);
  return redirect(`${path}?${params.toString()}`);
}
