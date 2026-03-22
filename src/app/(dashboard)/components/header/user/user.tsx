'use client';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

import DashboardHeaderUserAvatar from './avatar';
import DashboardHeaderUserMenu from './menu';

export default function DashboardHeaderUser() {
  const { user, customer } = useDashboardUser();

  if (!user || !user.email) return null;

  return (
    <SidebarMenu className="w-auto">
      <SidebarMenuItem>
        <DropdownMenu>
          <DashboardHeaderUserAvatar email={user.email} customer={customer} />
          <DashboardHeaderUserMenu />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
