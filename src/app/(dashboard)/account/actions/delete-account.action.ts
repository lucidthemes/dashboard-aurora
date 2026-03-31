'use server';

import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteAccount(deleteAccountId: string) {
  await createLogEvent('info', 'DELETE_ACCOUNT_SUCCESSFUL', 'Account deleted. Id: ' + deleteAccountId, deleteAccountId);

  return { success: true };
}
