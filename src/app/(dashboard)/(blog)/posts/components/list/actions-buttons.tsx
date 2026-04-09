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

import type { PostsList } from '../../schemas/posts-list.schema';
import { usePostsStore } from '../../store/posts-store';
import duplicatePost from '../../actions/duplicate-post.action';

export default function PostsListColumnActionsButtons({ item }: { item: PostsList }) {
  const { setDeleteDialogOpen, setDeleteDialogPostId } = usePostsStore();

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
          <Link href={`/post?action=edit&id=${item.id}`}>
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
                const result = await duplicatePost(item.id);

                if (result.success) {
                  toast.success('Successfully duplicated');
                } else {
                  toast.error('Error duplicating post');
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
              setDeleteDialogPostId(item.id);
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
