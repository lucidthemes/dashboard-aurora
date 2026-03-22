'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useInstagramFeedStore } from '../../../store/instagram-feed-store';

export default function InstagramFeedFormImagesAddButton() {
  const { setFormMediaOpen } = useInstagramFeedStore();

  return (
    <li className="flex aspect-square items-center justify-center rounded-md border-1 border-dashed">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={() => setFormMediaOpen(true)}
      >
        <Plus />
      </Button>
    </li>
  );
}
