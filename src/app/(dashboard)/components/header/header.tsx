'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import DashboardHeaderBreadcrumb from './breadcrumb';
import DashboardHeaderThemeSwitcher from './theme-switcher';
import DashboardHeaderUser from './user';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-1 flex h-16 shrink-0 items-center justify-between gap-2 border-b-1 bg-background px-5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <DashboardHeaderBreadcrumb />
      </div>
      <div className="flex items-center gap-x-2">
        <DashboardHeaderThemeSwitcher />
        <Separator orientation="vertical" className="ml-2 data-[orientation=vertical]:h-4" />
        <DashboardHeaderUser />
      </div>
    </header>
  );
}
