'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteDialogDeleteRowFromTable(
  rowId: string,
  table: string,
  path: string,
  logEventName: string,
  logEventMessage: string,
  userId: string,
) {
  if (!rowId || !table) return { success: false };

  const supabase = await createClient();

  const { error } = await supabase.from(table).delete().eq('id', rowId);

  if (error) {
    await createLogEvent('error', logEventName + '_FAILED', error.message, userId);

    return { success: false };
  }

  revalidatePath(path);

  await createLogEvent('info', logEventName + '_SUCCESSFUL', logEventMessage + ' deleted. Id: ' + rowId, userId);

  return { success: true };
}
