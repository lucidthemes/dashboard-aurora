'use client';

import { Sidebar, SidebarRail } from '@/components/ui/sidebar';

import DashboardSidebarHeader from './header';
import DashboardSidebarContent from './content';

export default function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <SidebarRail />
    </Sidebar>
  );
}
