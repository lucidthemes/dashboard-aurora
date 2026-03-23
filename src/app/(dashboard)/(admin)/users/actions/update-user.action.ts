'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function updateUser({
  updateUserId,
  updateUserRole,
  userId,
}: {
  updateUserId: string;
  updateUserRole: 'customer' | 'editor' | 'admin';
  userId: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from('user_roles').update({ role: updateUserRole }).eq('user_id', updateUserId);

  if (error) {
    await createLogEvent('error', 'UPDATE_USER_FAILED', error.message + '. User Id: ' + updateUserId, userId);

    return { success: false };
  }

  revalidatePath('/users');

  await createLogEvent(
    'info',
    'UPDATE_USER_SUCCESSFUL',
    'User updated to ' + updateUserRole + ' role. Id: ' + updateUserId,
    userId,
  );

  return { success: true };
}
