'use server';

import type { ResetPasswordForm } from '@/app/auth/reset-password/reset-password.schema';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { ResetPasswordFormSchema } from './reset-password.schema';

export async function resetPassword(formData: ResetPasswordForm) {
  const parsed = ResetPasswordFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'RESET_PASSWORD_INVALID_DATA', 'Reset password failed schema validation');

    return { success: false };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'RESET_PASSWORD_FAILED', error.message);

    return { success: false };
  }

  if (!data.user) {
    await createLogEvent('error', 'RESET_PASSWORD_NO_USER', 'No user found');

    return { success: false };
  }

  await createLogEvent('info', 'RESET_PASSWORD_SUCCESSFUL', 'Password reset', data.user.id);

  return { success: true };
}
