'use client';

import { Layers } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { DeleteButton } from '@/components/buttons';

import { useInstagramFeedStore } from '../../../store/instagram-feed-store';
import type { InstagramFeedFormImages } from '../../../schemas/form.schema';

export default function InstagramFeedFormImagesListItemButtons({ item }: { item: InstagramFeedFormImages }) {
  const { removeSelectedImage, updateSelectedImagePosition } = useInstagramFeedStore();

  return (
    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 transform">
      <div className="flex gap-x-2.5">
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" size="icon-sm" className="cursor-pointer">
              <Layers />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50" align="start">
            <FieldGroup className="gap-4">
              <Field orientation="horizontal">
                <FieldLabel htmlFor="position" className="w-1/2">
                  Position
                </FieldLabel>
                <Input
                  id="position"
                  type="number"
                  defaultValue={item.position}
                  min={1}
                  onChange={(e) => updateSelectedImagePosition(item.media.id, e.target.valueAsNumber)}
                />
              </Field>
            </FieldGroup>
          </PopoverContent>
        </Popover>
        <DeleteButton type="button" onClick={() => removeSelectedImage(item.media.id)} />
      </div>
    </div>
  );
}
