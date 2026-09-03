import { VideoIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function VideoBlockRenderEmpty({ editVideoBlockURL }: { editVideoBlockURL: () => void }) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <VideoIcon />
        </EmptyMedia>
        <EmptyTitle>No video selected</EmptyTitle>
        <EmptyDescription>Select a video to use for the block</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" className="cursor-pointer" onClick={editVideoBlockURL}>
          Select video
        </Button>
      </EmptyContent>
    </Empty>
  );
}
