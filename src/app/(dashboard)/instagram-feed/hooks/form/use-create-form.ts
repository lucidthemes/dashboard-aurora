'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';
import { InstagramFeedFormSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeedForm } from '@/schemas/instagram-feed.schema';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import { createInstagramFeed } from '../../actions/create-feed.action';

export default function useInstagramFeedCreateForm() {
  const { user } = useDashboardUser();

  const { setCreateOpen, selectedImages } = useInstagramFeedStore();

  const form = useForm<InstagramFeedForm>({
    defaultValues: {
      name: 'New feed',
      layout: {
        gap: 4,
        aspectRatio: 'square',
        mobilePosts: 1,
        tabletPosts: 4,
        desktopPosts: 6,
        mobileColumns: 1,
        tabletColumns: 4,
        desktopColumns: 6,
      },
      button: {
        enabled: false,
        link: 'https://aurora-sb.vercel.app/',
        text: 'Follow on Instagram',
      },
    },
    resolver: zodResolver(InstagramFeedFormSchema),
    shouldUnregister: true,
  });

  const instagramFeedFormCreateMutation = useMutation({
    mutationFn: createInstagramFeed,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully created');
        setCreateOpen(false);
      } else {
        toast.error('Error creating feed');
      }
    },
  });

  const onSubmit = async (data: InstagramFeedForm) => {
    if (selectedImages.length === 0) {
      toast.error('No feed images selected');
      return;
    }

    instagramFeedFormCreateMutation.mutate({ formData: data, formImages: selectedImages, userId: user.id });
  };

  return { form, onSubmit, isPending: instagramFeedFormCreateMutation.isPending };
}
