'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';
import { EditButton, DeleteButton } from '@/components/buttons';

import type { PostsTagsList } from '../../schemas/tags-list.schema';
import { usePostsTagsStore } from '../../store/posts-tags-store';

export default function PostsTagsListColumns() {
  const { setEditSheetOpen, setEditSheetPostTag, setDeleteDialogOpen, setDeleteDialogPostTagId } = usePostsTagsStore();

  const columns: ColumnDef<PostsTagsList>[] = [];

  columns.push({
    accessorKey: 'name',
    header: 'Name',
  });

  columns.push({
    accessorKey: 'slug',
    header: 'Slug',
  });

  columns.push({
    accessorKey: 'description',
    header: 'Description',
  });

  columns.push({
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.created_at);
    },
  });

  columns.push({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <EditButton
            onClick={() => {
              setEditSheetOpen(true);
              setEditSheetPostTag(item);
            }}
          />

          <DeleteButton
            onClick={() => {
              setDeleteDialogOpen(true);
              setDeleteDialogPostTagId(item.id);
            }}
          />
        </div>
      );
    },
  });

  return columns;
}
