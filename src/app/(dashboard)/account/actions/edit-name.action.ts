'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { AccountNameForm } from '../schemas/name-form.schema';

export async function editName({ formData }: { formData: AccountNameForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_NAME_UNAUTHORIZED', 'Unauthorized user.', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('customers')
    .update({ first_name: formData.first_name, last_name: formData.last_name, updated_at: new Date() })
    .eq('id', user.id);

  if (error) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_NAME_FAILED', error.message, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_ACCOUNT_NAME_SUCCESSFUL', 'Name updated', user.id);

  revalidatePath('/account');

  return { success: true };
}
