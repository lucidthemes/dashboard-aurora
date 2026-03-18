'use client';

import { redirect } from 'next/navigation';

import { useDashboardUser } from '../user-provider';

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  const { role } = useDashboardUser();

  if (!role || role !== 'admin') {
    redirect('/');
  }

  return <>{children}</>;
}
