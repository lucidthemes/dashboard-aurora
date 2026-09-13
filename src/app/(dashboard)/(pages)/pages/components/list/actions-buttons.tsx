'use client';

import { useTransition } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Link from 'next/link';
import { EllipsisVertical, Eye, ExternalLink, Copy, PencilIcon, TrashIcon } from 'lucide-react';
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
  const { setDeleteDialogOpen, setDeleteDialogPageId } = usePagesStore(
    useShallow((state) => ({
      setDeleteDialogOpen: state.setDeleteDialogOpen,
      setDeleteDialogPageId: state.setDeleteDialogPageId,
    })),
  );

  const [isPending, startTransition] = useTransition();

  let itemViewLink = '';

  if (item.status === 'published') {
    const databaseUsed = process.env.NEXT_PUBLIC_DATABASE ?? 'unknown';

    const itemViewLinkPrefix =
      databaseUsed === 'production' ? 'https://aurora-sb.vercel.app/' : 'https://aurora-sb-staging.vercel.app/';

    itemViewLink = itemViewLinkPrefix + item.slug;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {item.status === 'published' && itemViewLink && (
          <>
            <DropdownMenuGroup>
              <Link href={itemViewLink} target="_blank">
                <DropdownMenuItem className="cursor-pointer justify-between">
                  <div className="flex items-center gap-2">
                    <Eye />
                    View
                  </div>
                  <ExternalLink />
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
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
