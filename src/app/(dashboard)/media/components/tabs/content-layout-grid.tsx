'use client';

import Image from 'next/image';
import { Video } from 'lucide-react';

import { ViewButton, EditButton, DeleteButton } from '@/components/buttons';
import { getPublicMediaUrl } from '@/lib/media/storage';
import type { Media } from '@/schemas/media.schema';
import { useMediaStore } from '@/store/media-store';

export default function MediaTabsContentLayoutGrid({ media }: { media: Media[] }) {
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
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {media.map((item) => {
        const publicMediaUrl = getPublicMediaUrl(item.storage_path);

        return (
          <li key={item.id} className="group relative size-fit overflow-hidden rounded-lg">
            {item.type === 'image' && (
              <Image
                src={publicMediaUrl}
                alt={item.alt_text ?? ''}
                width={250}
                height={250}
                className="aspect-square object-cover"
              />
            )}
            {item.type === 'video' && (
              <div className="flex h-60 w-60 flex-col items-center justify-center gap-y-2.5 bg-sidebar">
                <Video className="h-10 w-10 stroke-ring">
                  <source src={publicMediaUrl} type="video/mp4" />
                </Video>
              </div>
            )}
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
          </li>
        );
      })}
    </ul>
  );
}
