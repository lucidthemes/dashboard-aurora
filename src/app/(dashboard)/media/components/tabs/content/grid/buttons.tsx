'use client';

import { ViewButton, EditButton, DeleteButton } from '@/components/buttons';
import type { Media } from '@/schemas/media.schema';

import { useMediaStore } from '../../../../store/media-store';

export default function MediaTabsContentLayoutGridItemButtons({
  item,
  publicMediaUrl,
}: {
  item: Media;
  publicMediaUrl: string;
}) {
  const {
    setViewOpen,
    setViewMediaType,
    setViewMediaUrl,
    setEditOpen,
    setEditData,
    setDeleteOpen,
    setDeleteStoragePath,
  } = useMediaStore();

  return (
    <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform gap-x-4 group-hover:block">
      <div className="flex gap-x-2.5">
        <ViewButton
          onClick={() => {
            setViewOpen(true);
            setViewMediaType(item.type);
            setViewMediaUrl(publicMediaUrl);
          }}
        />
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
            setDeleteStoragePath(item.storage_path);
          }}
        />
      </div>
    </div>
  );
}
