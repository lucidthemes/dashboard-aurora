'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { EllipsisVertical, Copy, PencilIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { PagesList } from '../../schemas/pages-list.schema';
import { usePagesStore } from '../../store/pages-store';
import duplicatePage from '../../actions/duplicate-page.action';

export default function PagesListColumnActionsButtons({ item }: { item: PagesList }) {
  const { setDeleteDialogOpen, setDeleteDialogPageId } = usePagesStore();

  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <Link href={`/page?action=edit&id=${item.id}`}>
            <DropdownMenuItem className="cursor-pointer">
              <PencilIcon />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const result = await duplicatePage(item.id);

                if (result.success) {
                  toast.success('Successfully duplicated');
                } else {
                  toast.error('Error duplicating page');
                }
              });
            }}
          >
            <Copy />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer"
            onClick={() => {
              setDeleteDialogOpen(true);
              setDeleteDialogPageId(item.id);
            }}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
