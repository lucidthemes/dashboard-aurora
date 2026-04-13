'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { AccountEmailForm } from '../schemas/email-form.schema';
import { AccountEmailFormSchema } from '../schemas/email-form.schema';

export async function editEmail({ formData }: { formData: AccountEmailForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_EMAIL_UNAUTHORIZED', 'Unauthorized user.', user?.id);

    return { success: false };
  }

  const parsed = AccountEmailFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'UPDATE_ACCOUNT_EMAIL_INVALID_DATA',
      'Update account email failed schema validation',
      user?.id,
    );

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    email: formData.email,
  });

  if (error) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_EMAIL_FAILED', error.message, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_ACCOUNT_EMAIL_SUCCESSFUL', 'Email updated', user.id);

  revalidatePath('/account');

  return { success: true };
}
