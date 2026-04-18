import { ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function MediaTextBlockRenderEmpty({
  editMediaTextBlockURL,
}: {
  editMediaTextBlockURL: (mediaType: 'image' | 'video') => void;
}) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageIcon />
        </EmptyMedia>
        <EmptyTitle>No media selected</EmptyTitle>
        <EmptyDescription>Select an image or video to use for the block</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-row justify-center gap-x-5">
        <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => editMediaTextBlockURL('image')}>
          Select image
        </Button>
        <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => editMediaTextBlockURL('video')}>
          Select video
        </Button>
      </EmptyContent>
    </Empty>
  );
}
