'use client';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import MainHeader from '@/components/dashboard/main-header';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MainHeader />
        <div className="p-5 sm:p-7.5 md:p-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
