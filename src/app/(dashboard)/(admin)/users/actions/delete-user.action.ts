'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createLogEvent } from '@/lib/supabase/log-event';

import { UsersDeleteUserActionSchema } from '../schemas/actions/delete-user.schema';

export async function deleteUser({ deleteUserId }: { deleteUserId: string }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || role !== 'admin') {
    await createLogEvent('error', 'DELETE_USER_UNAUTHORIZED', 'Unauthorized user. Id: ' + deleteUserId, user?.id);

    return { success: false };
  }

  const parsed = UsersDeleteUserActionSchema.safeParse(deleteUserId);

  if (!parsed.success) {
    await createLogEvent('error', 'DELETE_USER_INVALID_DATA', 'Delete user failed schema validation', user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'DELETE_USER_SUCCESSFUL', 'User deleted. Id: ' + deleteUserId, user.id);

  return { success: true };
}
