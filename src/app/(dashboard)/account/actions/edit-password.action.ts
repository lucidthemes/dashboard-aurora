'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { AccountPasswordForm } from '../schemas/password-form.schema';
import { AccountPasswordFormSchema } from '../schemas/password-form.schema';

export async function editPassword({ formData }: { formData: AccountPasswordForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_PASSWORD_UNAUTHORIZED', 'Unauthorized user.', user?.id);

    return { success: false };
  }

  const parsed = AccountPasswordFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'UPDATE_ACCOUNT_PASSWORD_INVALID_DATA',
      'Update account password failed schema validation',
      user?.id,
    );

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_PASSWORD_FAILED', error.message, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_ACCOUNT_PASSWORD_SUCCESSFUL', 'Password updated', user.id);

  revalidatePath('/account');

  return { success: true };
}
