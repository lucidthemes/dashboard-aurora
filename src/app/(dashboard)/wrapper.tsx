'use client';

import { usePathname } from 'next/navigation';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import DashboardSidebar from './components/sidebar';
import DashboardHeader from './components/header';

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const contentPadding = !['/post', '/page'].includes(pathname) ? 'p-5 sm:p-7.5 md:p-10' : '';

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className={`h-full ${contentPadding}`}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
