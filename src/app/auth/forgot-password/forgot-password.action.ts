'use server';

import type { ForgotPasswordForm } from '@/app/auth/forgot-password/forgot-password.schema';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function forgotPassword(formData: ForgotPasswordForm) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

  if (error) {
    await createLogEvent('error', 'LOST_PASSWORD_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  await createLogEvent('info', 'LOST_PASSWORD_SUCCESSFUL', 'Lost password. Email: ' + formData.email);

  return { success: true };
}
