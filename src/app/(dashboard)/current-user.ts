import type { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';
import type { Customer } from '@/schemas/customer.schema';

export async function getCurrentDashboardUser(): Promise<{
  user: User;
  role: 'admin' | 'editor';
  customer: Customer;
} | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: roleData } = await supabase.from('user_roles').select('role').eq('user_id', user.id).single();

  if (!roleData || !['admin', 'editor'].includes(roleData.role)) {
    return null;
  }

  const { data: customerData } = await supabase.from('customers').select().eq('id', user.id).single();

  return { user, role: roleData?.role, customer: customerData };
}
