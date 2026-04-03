'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteUser({ deleteUserId }: { deleteUserId: string }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || role !== 'admin') {
    await createLogEvent('error', 'DELETE_USER_UNAUTHORIZED', 'Unauthorized user. Id: ' + deleteUserId, user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'DELETE_USER_SUCCESSFUL', 'User deleted. Id: ' + deleteUserId, user.id);

  return { success: true };
}
