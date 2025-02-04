import { redirect } from 'next/navigation';
import { MessageType } from '@/types/auth';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {MessageType} type - The type of message ('success', 'error', or 'message')
 * @param {string} path - The path to redirect to
 * @param {string} message - The message to be encoded and added as a query parameter
 */
export function encodedRedirect(
  type: MessageType,
  path: string,
  message: string
) {
  const params = new URLSearchParams();
  params.set(type, message);
  return redirect(`${path}?${params.toString()}`);
}
