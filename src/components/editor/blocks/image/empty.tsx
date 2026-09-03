import { ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function ImageBlockRenderEmpty({ editImageBlockURL }: { editImageBlockURL: () => void }) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageIcon />
        </EmptyMedia>
        <EmptyTitle>No image selected</EmptyTitle>
        <EmptyDescription>Select an image to use for the block</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" className="cursor-pointer" onClick={editImageBlockURL}>
          Select image
        </Button>
      </EmptyContent>
    </Empty>
  );
}
