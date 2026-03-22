'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';

import type { Customer } from '@/schemas/customer.schema';

export default function DashboardHeaderUserAvatar({ email, customer }: { email: string; customer: Customer }) {
  const avatarCharacters = (customer.first_name?.[0] ?? '') + (customer.last_name?.[0] ?? '') || (email?.[0] ?? '');

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback className="rounded-lg uppercase">{avatarCharacters}</AvatarFallback>
        </Avatar>
        <div className="grid hidden flex-1 gap-1 text-left text-sm leading-tight lg:grid">
          {(customer.first_name || customer.last_name) && (
            <div className="flex gap-1 truncate font-medium">
              <span>{customer.first_name}</span>
              <span>{customer.last_name}</span>
            </div>
          )}
          <span className="truncate text-xs">{email}</span>
        </div>
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
}
