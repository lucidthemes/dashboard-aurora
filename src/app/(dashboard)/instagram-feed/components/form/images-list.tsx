import { useEffect } from 'react';
import Image from 'next/image';
import type { UseQueryResult } from '@tanstack/react-query';
import { Layers } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { DeleteButton } from '@/components/buttons';

import { useInstagramFeedStore } from '@/store/instagram-feed-store';
import type { InstagramFeedFormImages } from '@/schemas/instagram-feed.schema';

export default function InstagramFeedFormImagesList({
  type,
  feedFormImagesQuery,
}: {
  type: 'create' | 'edit';
  feedFormImagesQuery: UseQueryResult<InstagramFeedFormImages[]>;
}) {
  const { selectedImages, setSelectedImages, removeSelectedImage, updateSelectedImagePosition } =
    useInstagramFeedStore();

  useEffect(() => {
    if (!feedFormImagesQuery.isSuccess || !feedFormImagesQuery.data) return;

    setSelectedImages(feedFormImagesQuery.data);
  }, [type, feedFormImagesQuery.isSuccess, feedFormImagesQuery.data, setSelectedImages]);

  return (
    <>
      {selectedImages.map((image) => {
        const publicMediaUrl = `/temp/${image.media.storage_path}`;

        return (
          <li key={image.media.id} className="relative h-full w-full overflow-hidden rounded-md">
            <Image
              src={publicMediaUrl}
              alt={image.media.alt_text ?? ''}
              width={150}
              height={150}
              className="aspect-square object-cover"
            />
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
                          defaultValue={image.position}
                          min={1}
                          onChange={(e) => updateSelectedImagePosition(image.media.id, e.target.valueAsNumber)}
                        />
                      </Field>
                    </FieldGroup>
                  </PopoverContent>
                </Popover>
                <DeleteButton type="button" onClick={() => removeSelectedImage(image.media.id)} />
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
}
