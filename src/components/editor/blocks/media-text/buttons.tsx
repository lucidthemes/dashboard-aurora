import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import mediaTextBlockStyles from './style.module.css';

interface MediaTextBlockRenderButtonsProps {
  media: 'image' | 'video';
  editMediaTextBlockURL: (mediaType: 'image' | 'video') => void;
  removeMediaTextBlockURL: () => void;
}

export default function MediaTextBlockRenderButtons({
  media,
  editMediaTextBlockURL,
  removeMediaTextBlockURL,
}: MediaTextBlockRenderButtonsProps) {
  const mediaTextBlockMediaWrapperButtonsClass = mediaTextBlockStyles['block-media-text-media-wrapper-buttons'];

  return (
    <div className={mediaTextBlockMediaWrapperButtonsClass}>
      <Button variant="ghost" size="icon-sm" onClick={() => editMediaTextBlockURL(media)}>
        <Pencil />
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={removeMediaTextBlockURL}>
        <X />
      </Button>
    </div>
  );
}
