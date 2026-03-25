'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function createUser({ createUserEmail, userId }: { createUserEmail: string; userId: string }) {
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.inviteUserByEmail(createUserEmail);

  if (error) {
    await createLogEvent('error', 'CREATE_USER_FAILED', error.message + '. Email: ' + createUserEmail, userId);

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_USER_SUCCESSFUL', 'User invited. Email: ' + createUserEmail, userId);

  return { success: true };
}
