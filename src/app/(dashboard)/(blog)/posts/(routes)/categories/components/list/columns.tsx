'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';
import { EditButton, DeleteButton } from '@/components/buttons';

import type { PostsCategoriesList } from '../../schemas/categories-list.schema';
import { usePostsCategoriesStore } from '../../store/posts-categories-store';

export default function PostsCategoriesListColumns() {
  const { setEditSheetOpen, setEditSheetPostCategory, setDeleteDialogOpen, setDeleteDialogPostCategoryId } =
    usePostsCategoriesStore();

  const columns: ColumnDef<PostsCategoriesList>[] = [];

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
              setEditSheetPostCategory(item);
            }}
          />

          <DeleteButton
            onClick={() => {
              setDeleteDialogOpen(true);
              setDeleteDialogPostCategoryId(item.id);
            }}
          />
        </div>
      );
    },
  });

  return columns;
}
