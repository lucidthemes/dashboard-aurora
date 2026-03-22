'use client';

import Link from 'next/link';
import { CircleUser } from 'lucide-react';

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import DashboardHeaderUserLogoutButton from './logout-button';

export default function DashboardHeaderUserMenu() {
  return (
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
        <DashboardHeaderUserLogoutButton />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
