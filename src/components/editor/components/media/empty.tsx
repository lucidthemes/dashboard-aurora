import { Image as ImageIcon } from 'lucide-react';

import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function EditorMediaListEmpty() {
  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageIcon />
        </EmptyMedia>
        <EmptyTitle>No media found</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
