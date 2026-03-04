'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { ViewButton, EditButton, DeleteButton } from '@/components/buttons';
import { dateFormat } from '@/lib/formatters';
import type { Media } from '@/schemas/media.schema';
import { useMediaStore } from '@/store/media-store';
import { getPublicMediaUrl } from '@/lib/media/storage';

export default function MediaLayoutListColumns(type: 'images' | 'videos') {
  const {
    setViewOpen,
    setViewMediaType,
    setViewMediaUrl,
    setEditOpen,
    setEditData,
    setDeleteOpen,
    setDeleteRowId,
    setDeleteTable,
  } = useMediaStore();

  const columns: ColumnDef<Media>[] = [];

  if (type === 'images') {
    columns.push({
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {
        const item = row.original;
        const publicMediaUrl = getPublicMediaUrl(item.storage_path);

        return (
          <div className="group relative max-w-25 overflow-hidden rounded-md">
            <img src={publicMediaUrl} alt={item.alt_text ?? ''} className="aspect-square object-cover" />
            <ViewButton
              className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover:flex"
              onClick={() => {
                setViewOpen(true);
                setViewMediaType(item.type);
                setViewMediaUrl(publicMediaUrl);
              }}
            />
          </div>
        );
      },
    });
  } else if (type === 'videos') {
    columns.push({
      accessorKey: 'video',
      header: 'Video',
      cell: ({ row }) => {
        const item = row.original;
        const publicMediaUrl = getPublicMediaUrl(item.storage_path);

        return (
          <div className="group relative h-25 w-25 rounded-md bg-sidebar">
            <ViewButton
              className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 group-hover:flex"
              onClick={() => {
                setViewOpen(true);
                setViewMediaType(item.type);
                setViewMediaUrl(publicMediaUrl);
              }}
            />
          </div>
        );
      },
    });
  }

  columns.push({
    accessorKey: 'storage_path',
    header: 'Storage path',
  });

  if (type === 'images') {
    columns.push({
      accessorKey: 'alt_text',
      header: 'Alt text',
    });
  }

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
    size: 60,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="hidden group-hover:block">
          <div className="flex justify-end gap-x-2.5">
            {item.type === 'image' && (
              <EditButton
                onClick={() => {
                  setEditOpen(true);
                  setEditData({ id: item.id, alt_text: item.alt_text });
                }}
              />
            )}
            <DeleteButton
              onClick={() => {
                setDeleteOpen(true);
                setDeleteRowId(item.id);
                setDeleteTable('media');
              }}
            />
          </div>
        </div>
      );
    },
  });

  return columns;
}
