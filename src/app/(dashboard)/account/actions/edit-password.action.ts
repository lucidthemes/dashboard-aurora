'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { AccountPasswordForm } from '../schemas/password-form.schema';

export async function editPassword({ formData, userId }: { formData: AccountPasswordForm; userId: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_PASSWORD_FAILED', error.message, userId);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_ACCOUNT_PASSWORD_SUCCESSFUL', 'Password updated', userId);

  revalidatePath('/account');

  return { success: true };
}
