'use client';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import DashboardSidebar from './components/sidebar';
import DashboardHeader from './components/header';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="p-5 sm:p-7.5 md:p-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
