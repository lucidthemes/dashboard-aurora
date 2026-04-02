import type { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';
import { getUserWithRole } from '@/lib/supabase/auth';
import type { Customer } from '@/schemas/customer.schema';

export async function getCurrentDashboardUser(): Promise<{
  user: User | null;
  role: 'admin' | 'editor' | null;
  customer: Customer | null;
} | null> {
  const { user, role } = await getUserWithRole();

  if (!user || !role) return { user: null, role: null, customer: null };

  const supabase = await createClient();

  const { data: customerData } = await supabase.from('customers').select().eq('id', user.id).single();

  if (!customerData) return { user: null, role: null, customer: null };

  return { user, role, customer: customerData };
}
