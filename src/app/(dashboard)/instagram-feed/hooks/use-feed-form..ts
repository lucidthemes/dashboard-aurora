'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { createInstagramFeed, editInstagramFeed } from '@/actions/instagram-feed.actions';
import { InstagramFeedFormSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeed } from '@/schemas/instagram-feed.schema';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

export default function useInstagramFeedForm(type: 'create' | 'edit', formData?: InstagramFeed | null) {
  const { selectedImages } = useInstagramFeedStore();

  const form = useForm<z.infer<typeof InstagramFeedFormSchema>>({
    defaultValues: {
      name: formData?.name ?? 'New feed',
      layout: {
        gap: formData?.layout.gap ?? 4,
        aspectRatio: formData?.layout.aspectRatio ?? 'square',
        mobilePosts: formData?.layout.mobilePosts ?? 1,
        tabletPosts: formData?.layout.tabletPosts ?? 4,
        desktopPosts: formData?.layout.desktopPosts ?? 6,
        mobileColumns: formData?.layout.mobileColumns ?? 1,
        tabletColumns: formData?.layout.tabletColumns ?? 4,
        desktopColumns: formData?.layout.desktopColumns ?? 6,
      },
      button: {
        enabled: formData?.button.enabled ?? true,
        link: formData?.button.link ?? 'https://aurora-sb.vercel.app/',
        text: formData?.button.text ?? 'Follow on Instagram',
      },
    },
    resolver: zodResolver(InstagramFeedFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof InstagramFeedFormSchema>) => {
    if (selectedImages.length === 0) {
      toast.error('No feed images selected');
      return;
    }

    if (type === 'create') {
      const res = await createInstagramFeed(data, selectedImages);

      if (res.success) {
        toast.success('Successfully created');
      } else {
        toast.error('Error creating feed');
      }
    } else {
      if (!formData) {
        toast.error('Error updating feed');
        return;
      }

      const res = await editInstagramFeed(formData.id, data, selectedImages);

      if (res.success) {
        toast.success('Successfully updated');
      } else {
        toast.error('Error updating feed');
      }
    }
  };

  return { form, onSubmit };
}
