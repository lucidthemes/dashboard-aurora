'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { EditButton, DeleteButton, CopyButton } from '@/components/buttons';
import { dateFormat } from '@/lib/formatters';

import { useSidebarsStore } from '../../store/sidebars-store';
import type { SidebarsList } from '../../schemas/list.schema';

export default function SidebarsListColumns() {
  // const { setEditOpen, setEditData, setDeleteOpen, setDeleteRowId } = useInstagramFeedStore();

  const { setEditSheetOpen, setEditSheetSidebar, setDeleteDialogOpen, setDeleteDialogSidebarId } = useSidebarsStore();

  const columns: ColumnDef<SidebarsList>[] = [];

  columns.push({
    accessorKey: 'id',
    header: 'Sidebar id',
  });

  columns.push({
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex items-center gap-x-4">
          <p className="text-wrap">{item.name}</p>
          <CopyButton
            onClick={() => {
              navigator.clipboard.writeText(item.name);
              toast.success('Copied to clipboard');
            }}
          />
        </div>
      );
    },
  });

  columns.push({
    accessorKey: 'title',
    header: 'Title',
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
              setEditSheetOpen(true);
              setEditSheetSidebar(item);
            }}
          />
          <DeleteButton
            onClick={() => {
              setDeleteDialogOpen(true);
              setDeleteDialogSidebarId(item.id);
            }}
          />
        </div>
      );
    },
  });

  return columns;
}
