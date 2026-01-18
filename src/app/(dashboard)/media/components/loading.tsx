'use client';

import { Spinner } from '@/components/ui/spinner';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

export default function MediaLoading({ type }: { type: 'images' | 'videos' }) {
  return (
    <Empty className="min-h-75 border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle className="capitalize">loading {type}</EmptyTitle>
        <EmptyDescription>Please wait while we load the {type}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
