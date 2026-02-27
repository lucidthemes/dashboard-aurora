import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import MainHeader from '@/components/dashboard/main-header';

import { getCurrentDashboardUser } from './current-user';
import { DashboardUserProvider } from './user-provider';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const dashboardUser = await getCurrentDashboardUser();

  if (!dashboardUser) {
    redirect('/auth/login');
  }

  return (
    <DashboardUserProvider user={dashboardUser.user} role={dashboardUser.role}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <MainHeader />
          <div className="p-5 sm:p-7.5 md:p-10">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardUserProvider>
  );
}
