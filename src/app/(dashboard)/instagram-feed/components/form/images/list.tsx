'use client';

import { useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

import { useInstagramFeedStore } from '../../../store/instagram-feed-store';
import type { InstagramFeedFormImages } from '../../../schemas/form.schema';
import InstagramFeedFormImagesListItem from './item';

export default function InstagramFeedFormImagesList({
  formType,
  feedFormImagesQuery,
}: {
  formType: 'create' | 'edit';
  feedFormImagesQuery: UseQueryResult<InstagramFeedFormImages[]>;
}) {
  const { selectedImages, setSelectedImages } = useInstagramFeedStore();

  useEffect(() => {
    if (!feedFormImagesQuery.isSuccess || !feedFormImagesQuery.data) return;

    setSelectedImages(feedFormImagesQuery.data);
  }, [formType, feedFormImagesQuery.isSuccess, feedFormImagesQuery.data, setSelectedImages]);

  return (
    <>
      {selectedImages.map((image) => (
        <InstagramFeedFormImagesListItem key={image.media.id} item={image} />
      ))}
    </>
  );
}
