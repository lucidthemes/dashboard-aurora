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

import type { PostsList } from '../../schemas/posts-list.schema';
import { usePostsStore } from '../../store/posts-store';
import duplicatePost from '../../actions/duplicate-post.action';

export default function PostsListColumnActionsButtons({ item }: { item: PostsList }) {
  const { setDeleteDialogOpen, setDeleteDialogPostId } = usePostsStore(
    useShallow((state) => ({
      setDeleteDialogOpen: state.setDeleteDialogOpen,
      setDeleteDialogPostId: state.setDeleteDialogPostId,
    })),
  );

  const [isPending, startTransition] = useTransition();

  let itemViewLink = '';

  if (item.status === 'published') {
    const databaseUsed = process.env.NEXT_PUBLIC_DATABASE ?? 'unknown';

    const itemViewLinkPrefix =
      databaseUsed === 'production'
        ? 'https://aurora-sb.vercel.app/blog/'
        : 'https://aurora-sb-staging.vercel.app/blog/';

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
