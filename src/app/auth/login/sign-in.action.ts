'use server';

import type { LoginForm } from '@/schemas/auth/login.schema';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function signIn(formData: LoginForm) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    createLogEvent('error', 'SIGN_IN_FAILED', error.message + '. Email: ' + formData.email);

    return { success: false };
  }

  if (!data.user) {
    createLogEvent('error', 'SIGN_IN_NO_USER', 'No user found. Email: ' + formData.email);

    return { success: false };
  }

  const { data: roleData, error: roleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', data.user.id)
    .single();

  if (roleError) {
    createLogEvent('error', 'SIGN_IN_ROLE_FAILED', roleError.message + '. Email: ' + formData.email);

    return { success: false };
  }

  if (!roleData || !['admin', 'editor'].includes(roleData.role)) {
    await supabase.auth.signOut();

    createLogEvent('error', 'SIGN_IN_NOT_ADMIN', 'User not admin sign in attempt. Email: ' + formData.email);

    return { success: false };
  }

  createLogEvent('info', 'SIGN_IN_SUCCESSFUL', 'User signed in', data.user?.id);

  return { success: true };
}
