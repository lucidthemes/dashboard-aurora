'use server';

import type { LoginForm } from '@/app/auth/login/login.schema';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { LoginFormSchema } from './login.schema';

export async function signIn(formData: LoginForm) {
  const parsed = LoginFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'SIGN_IN_INVALID_DATA', 'User sign in failed schema validation');

    return { success: false };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    await createLogEvent('error', 'SIGN_IN_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  if (!data.user) {
    await createLogEvent('error', 'SIGN_IN_NO_USER', 'No user found. Email: ' + formData.email);

    return { success: false };
  }

  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', data.user.id)
    .single();

  if (roleError) {
    await createLogEvent('error', 'SIGN_IN_ROLE_FAILED', roleError.message + '. Email: ' + formData.email);

    return { success: false };
  }

  if (!roleData || !['admin', 'editor'].includes(roleData.role)) {
    await supabase.auth.signOut();

    await createLogEvent('error', 'SIGN_IN_NOT_ADMIN', 'User not admin sign in attempt. Email: ' + formData.email);

    return { success: false };
  }

  await createLogEvent('info', 'SIGN_IN_SUCCESSFUL', 'User signed in', data.user?.id);

  return { success: true };
}
