'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteDialogDeleteRowFromTable(
  rowId: string,
  table: string,
  path: string,
  logEventName: string,
  logEventMessage: string,
) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent(
      'error',
      logEventName + '_UNAUTHORIZED',
      'Unauthorized user. ' + logEventMessage + ' deleted. Id: ' + rowId,
      user?.id,
    );

    return { success: false };
  }

  if (!rowId || !table) return { success: false };

  const supabase = await createClient();

  const { error } = await supabase.from(table).delete().eq('id', rowId);

  if (error) {
    await createLogEvent('error', logEventName + '_FAILED', error.message, user.id);

    return { success: false };
  }

  revalidatePath(path);

  await createLogEvent('info', logEventName + '_SUCCESSFUL', logEventMessage + ' deleted. Id: ' + rowId, user.id);

  return { success: true };
}
