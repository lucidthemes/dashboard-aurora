'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function updateUser({
  updateUserId,
  updateUserRole,
}: {
  updateUserId: string;
  updateUserRole: 'customer' | 'editor' | 'admin';
}) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || role !== 'admin') {
    await createLogEvent('error', 'UPDATE_USER_UNAUTHORIZED', 'Unauthorized user. User Id: ' + updateUserId, user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('user_roles').update({ role: updateUserRole }).eq('user_id', updateUserId);

  if (error) {
    await createLogEvent('error', 'UPDATE_USER_FAILED', error.message + '. User Id: ' + updateUserId, user.id);

    return { success: false };
  }

  revalidatePath('/users');

  await createLogEvent(
    'info',
    'UPDATE_USER_SUCCESSFUL',
    'User updated to ' + updateUserRole + ' role. Id: ' + updateUserId,
    user.id,
  );

  return { success: true };
}
