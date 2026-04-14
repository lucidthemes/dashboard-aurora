'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { EditButton, DeleteButton, CopyButton } from '@/components/buttons';
import { dateFormat } from '@/lib/formatters';

import { useInstagramFeedStore } from '../../store/instagram-feed-store';
import type { InstagramFeed } from '../../schemas/feed.schema';

export default function InstagramFeedListColumns() {
  const { setEditOpen, setEditData, setDeleteOpen, setDeleteRowId } = useInstagramFeedStore();

  const columns: ColumnDef<InstagramFeed>[] = [];

  columns.push({
    accessorKey: 'id',
    header: 'Feed id',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center gap-x-4">
          <p className="text-wrap">{item.id}</p>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(item.id);
              toast.success('Copied to clipboard');
            }}
          />
        </div>
      );
    },
  });

  columns.push({
    accessorKey: 'name',
    header: 'Name',
  });

  columns.push({
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const item = row.original;

      return dateFormat(item.created_at);
    },
  });

  columns.push({
    id: 'actions',
    header: 'Actions',
    size: 60,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <EditButton
            onClick={() => {
              setEditOpen(true);
              setEditData(item);
            }}
          />

          <DeleteButton
            onClick={() => {
              setDeleteOpen(true);
              setDeleteRowId(item.id);
            }}
          />
        </div>
      );
    },
  });

  return columns;
}
