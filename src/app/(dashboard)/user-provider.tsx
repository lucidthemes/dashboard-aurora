'use client';

import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

import type { Customer } from '@/schemas/customer.schema';

type DashboardUserContextType = {
  user: User;
  role: 'admin' | 'editor';
  customer: Customer;
};

const DashboardUserContext = createContext<DashboardUserContextType | null>(null);

export function DashboardUserProvider({
  user,
  role,
  customer,
  children,
}: {
  user: User;
  role: 'admin' | 'editor';
  customer: Customer;
  children: React.ReactNode;
}) {
  return <DashboardUserContext.Provider value={{ user, role, customer }}>{children}</DashboardUserContext.Provider>;
}

export function useDashboardUser() {
  const dashboardUser = useContext(DashboardUserContext);

  if (!dashboardUser) {
    throw new Error('useDashboardUser must be used inside DashboardUserProvider');
  }
  return dashboardUser;
}
