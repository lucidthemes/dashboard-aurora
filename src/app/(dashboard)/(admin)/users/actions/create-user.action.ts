'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function createUser({ createUserEmail }: { createUserEmail: string }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || role !== 'admin') {
    await createLogEvent('error', 'CREATE_USER_UNAUTHORIZED', 'Unauthorized user. Email: ' + createUserEmail, user?.id);

    return { success: false };
  }

  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.inviteUserByEmail(createUserEmail);

  if (error) {
    await createLogEvent('error', 'CREATE_USER_FAILED', error.message + '. Email: ' + createUserEmail, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_USER_SUCCESSFUL', 'User invited. Email: ' + createUserEmail, user.id);

  return { success: true };
}
