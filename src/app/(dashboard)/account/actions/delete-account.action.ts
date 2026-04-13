'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createLogEvent } from '@/lib/supabase/log-event';

import { AccountDeleteAccountActionSchema } from '../schemas/actions/delete-account.schema';

export async function deleteAccount(deleteAccountId: string) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'DELETE_ACCOUNT_UNAUTHORIZED', 'Unauthorized user. Id: ' + deleteAccountId, user?.id);

    return { success: false };
  }

  const parsed = AccountDeleteAccountActionSchema.safeParse(deleteAccountId);

  if (!parsed.success) {
    await createLogEvent('error', 'DELETE_ACCOUNT_INVALID_DATA', 'Delete account failed schema validation', user?.id);

    return { success: false };
  }

  await createLogEvent('info', 'DELETE_ACCOUNT_SUCCESSFUL', 'Account deleted. Id: ' + deleteAccountId, user.id);

  return { success: true };
}
