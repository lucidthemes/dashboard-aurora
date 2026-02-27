'use client';

import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

type DashboardUserContextType = {
  user: User;
  role: 'admin' | 'editor';
};

const DashboardUserContext = createContext<DashboardUserContextType | null>(null);

export function DashboardUserProvider({
  user,
  role,
  children,
}: {
  user: User;
  role: 'admin' | 'editor';
  children: React.ReactNode;
}) {
  return <DashboardUserContext.Provider value={{ user, role }}>{children}</DashboardUserContext.Provider>;
}

export function useDashboardUser() {
  const dashboardUser = useContext(DashboardUserContext);

  if (!dashboardUser) {
    throw new Error('useDashboardUser must be used inside DashboardUserProvider');
  }
  return dashboardUser;
}
