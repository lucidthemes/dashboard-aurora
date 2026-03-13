'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CircleUser, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';

export function MainHeaderUser() {
  const router = useRouter();

  const { user, customer } = useDashboardUser();

  if (!user) return null;

  const supabase = createClient();

  const email = user.email;

  const avatarCharacters = (customer.first_name?.[0] ?? '') + (customer.last_name?.[0] ?? '') || (email?.[0] ?? '');

  return (
    <SidebarMenu className="w-auto">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg uppercase">{avatarCharacters}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
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
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem className="cursor-pointer">
                  <CircleUser />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  supabase.auth.signOut();
                  router.push('/auth/login');
                }}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
