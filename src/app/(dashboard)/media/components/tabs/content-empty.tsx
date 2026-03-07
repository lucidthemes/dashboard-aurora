'use client';

import { Image as ImageIcon, Video, Plus } from 'lucide-react';

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { useMediaStore } from '@/store/media-store';

export default function MediaTabsContentEmpty({ type }: { type: 'images' | 'videos' }) {
  const { setUploadOpen, setUploadType } = useMediaStore();

  const uploadType = type === 'images' ? 'image' : 'video';

  return (
    <Empty className="min-h-75 border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {type === 'images' && <ImageIcon />}
          {type === 'videos' && <Video />}
        </EmptyMedia>
        <EmptyTitle className="capitalize">No {type} Found</EmptyTitle>
        <EmptyDescription>Upload a file to access the {type}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            setUploadOpen(true);
            setUploadType(uploadType);
          }}
        >
          <Plus /> Upload
        </Button>
      </EmptyContent>
    </Empty>
  );
}
