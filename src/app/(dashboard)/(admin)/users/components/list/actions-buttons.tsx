'use client';

import { EllipsisVertical, Eye, PencilIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { UsersList } from '../../schemas/users-list.schema';
import { useUsersStore } from '../../store/users-store';

export default function UsersListColumnActionsButtons({ item }: { item: UsersList }) {
  const {
    setViewSheetOpen,
    setViewSheetUser,
    setEditSheetOpen,
    setEditSheetUser,

    setDeleteDialogOpen,
    setDeleteDialogUserId,
  } = useUsersStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setViewSheetOpen(true);
              setViewSheetUser(item);
            }}
          >
            <Eye />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setEditSheetOpen(true);
              setEditSheetUser(item);
            }}
          >
            <PencilIcon />
            Edit role
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              setDeleteDialogOpen(true);
              setDeleteDialogUserId(item.id);
            }}
          >
            <TrashIcon />
            Delete user
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
