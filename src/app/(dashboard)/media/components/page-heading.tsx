'use client';

import { Plus, Image as ImageIcon, Video } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PageHeadingWithButton } from '@/components/page-headings';
import { useMediaStore } from '@/store/media-store';

export default function MediaPageHeading() {
  const { setUploadOpen, setUploadType } = useMediaStore();

  return (
    <PageHeadingWithButton heading="Media">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="default" className="h-full cursor-pointer">
            <Plus /> Upload
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit" align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setUploadOpen(true);
              setUploadType('image');
            }}
          >
            <ImageIcon /> Image
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setUploadOpen(true);
              setUploadType('video');
            }}
          >
            <Video /> Video
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </PageHeadingWithButton>
  );
}
