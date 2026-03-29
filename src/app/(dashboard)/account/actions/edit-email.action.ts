'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { AccountEmailForm } from '../schemas/email-form.schema';

export async function editEmail({ formData, userId }: { formData: AccountEmailForm; userId: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email: formData.email,
  });

  if (error) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_EMAIL_FAILED', error.message, userId);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_ACCOUNT_EMAIL_SUCCESSFUL', 'Email updated', userId);

  revalidatePath('/account');

  return { success: true };
}
