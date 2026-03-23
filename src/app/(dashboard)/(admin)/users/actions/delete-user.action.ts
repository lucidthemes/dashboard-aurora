'use server';

import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteUser({ deleteUserId, userId }: { deleteUserId: string; userId: string }) {
  await createLogEvent('info', 'DELETE_USER_SUCCESSFUL', 'User deleted. Id: ' + deleteUserId, userId);

  return { success: true };
}
