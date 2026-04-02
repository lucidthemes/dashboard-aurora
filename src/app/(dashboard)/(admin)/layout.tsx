import { redirect } from 'next/navigation';

import { getUserWithRole } from '@/lib/supabase/auth';

export default async function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || role !== 'admin') {
    redirect('/');
  }

  return <>{children}</>;
}
