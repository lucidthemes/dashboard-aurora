'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { AccountNameForm } from '../schemas/name-form.schema';

export async function editName({ formData, userId }: { formData: AccountNameForm; userId: string }) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('customers')
    .update({ first_name: formData.first_name, last_name: formData.last_name, updated_at: new Date() })
    .eq('id', userId);

  if (error) {
    await createLogEvent('error', 'UPDATE_ACCOUNT_NAME_FAILED', error.message, userId);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_ACCOUNT_NAME_SUCCESSFUL', 'Name updated', userId);

  revalidatePath('/account');

  return { success: true };
}
