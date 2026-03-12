import { redirect } from 'next/navigation';

import { getCurrentDashboardUser } from './current-user';
import { DashboardUserProvider } from './user-provider';
import DashboardWrapper from './wrapper';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dashboardUser = await getCurrentDashboardUser();

  if (!dashboardUser) {
    redirect('/auth/login');
  }

  return (
    <DashboardUserProvider user={dashboardUser.user} role={dashboardUser.role}>
      <DashboardWrapper>{children}</DashboardWrapper>
    </DashboardUserProvider>
  );
}
