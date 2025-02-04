import { Message } from '@/types/auth';

export async function processSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<Message> {
  if ('error' in searchParams) {
    return { error: searchParams.error as string };
  }
  if ('success' in searchParams) {
    return { success: searchParams.success as string };
  }
  if ('message' in searchParams) {
    return { message: searchParams.message as string };
  }
  return {} as Message;
}
