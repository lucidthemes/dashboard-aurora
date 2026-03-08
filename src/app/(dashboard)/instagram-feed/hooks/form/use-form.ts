'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createInstagramFeed } from '../../actions/create-feed.action';
import { updateInstagramFeed } from '../../actions/update-feed.action';
import { InstagramFeedFormSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeed, InstagramFeedForm } from '@/schemas/instagram-feed.schema';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

export default function useInstagramFeedForm(type: 'create' | 'edit', formData?: InstagramFeed | null) {
  const { selectedImages } = useInstagramFeedStore();

  const form = useForm<InstagramFeedForm>({
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

  const instagramFeedFormCreateMutation = useMutation({
    mutationFn: createInstagramFeed,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully created');
      } else {
        toast.error('Error creating feed');
      }
    },
  });

  const instagramFeedFormUpdateMutation = useMutation({
    mutationFn: updateInstagramFeed,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
      } else {
        toast.error('Error updating feed');
      }
    },
  });

  const onSubmit = async (data: InstagramFeedForm) => {
    if (selectedImages.length === 0) {
      toast.error('No feed images selected');
      return;
    }

    if (type === 'create') {
      instagramFeedFormCreateMutation.mutate({ formData: data, formImages: selectedImages });
    } else {
      if (!formData) {
        toast.error('Error updating feed');
        return;
      }

      instagramFeedFormUpdateMutation.mutate({ feedId: formData.id, formData: data, formImages: selectedImages });
    }
  };

  return { form, onSubmit };
}
