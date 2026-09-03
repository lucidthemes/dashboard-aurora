import { ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function GalleryBlockRenderEmpty({ editGalleryBlockImages }: { editGalleryBlockImages: () => void }) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageIcon />
        </EmptyMedia>
        <EmptyTitle>No images selected</EmptyTitle>
        <EmptyDescription>Select images to use for the block</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" className="cursor-pointer" onClick={editGalleryBlockImages}>
          Select images
        </Button>
      </EmptyContent>
    </Empty>
  );
}
