import 'server-only';

import type { User } from '@supabase/supabase-js';

import { createClient } from './server';

export async function getUserWithRole(): Promise<{ user: User | null; role: 'editor' | 'admin' | null }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, role: null };

  const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).single();

  if (!roleData || !['admin', 'editor'].includes(roleData.role)) {
    return { user: null, role: null };
  }

  return { user, role: roleData.role };
}
