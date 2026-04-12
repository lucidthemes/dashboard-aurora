'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';
import { EditButton, DeleteButton } from '@/components/buttons';

import type { PostsAuthorsList } from '../../schemas/authors-list.schema';
import { usePostsAuthorsStore } from '../../store/posts-authors-store';

export default function PostsAuthorsListColumns() {
  const { setEditSheetOpen, setEditSheetPostAuthor, setDeleteDialogOpen, setDeleteDialogPostAuthorId } =
    usePostsAuthorsStore();

  const columns: ColumnDef<PostsAuthorsList>[] = [];

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
              setEditSheetPostAuthor(item);
            }}
          />

          <DeleteButton
            onClick={() => {
              setDeleteDialogOpen(true);
              setDeleteDialogPostAuthorId(item.id);
            }}
          />
        </div>
      );
    },
  });

  return columns;
}
