'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDashboardUser } from '../../user-provider';
import { useInstagramFeedStore } from '../store/instagram-feed-store';
import { updateInstagramFeed } from '../actions/update-feed.action';
import { InstagramFeedFormSchema } from '../schemas/form.schema';
import type { InstagramFeedForm } from '../schemas/form.schema';

export default function useInstagramFeedEditForm() {
  const { user } = useDashboardUser();

  const { setEditOpen, editData, selectedImages } = useInstagramFeedStore();

  const form = useForm<InstagramFeedForm>({
    defaultValues: {
      name: editData?.name ?? 'New feed',
      layout: {
        gap: editData?.layout.gap ?? 4,
        aspectRatio: editData?.layout.aspectRatio ?? 'square',
        mobilePosts: editData?.layout.mobilePosts ?? 1,
        tabletPosts: editData?.layout.tabletPosts ?? 4,
        desktopPosts: editData?.layout.desktopPosts ?? 6,
        mobileColumns: editData?.layout.mobileColumns ?? 1,
        tabletColumns: editData?.layout.tabletColumns ?? 4,
        desktopColumns: editData?.layout.desktopColumns ?? 6,
      },
      button: {
        enabled: editData?.button.enabled ?? false,
        link: editData?.button.link ?? 'https://aurora-sb.vercel.app/',
        text: editData?.button.text ?? 'Follow on Instagram',
      },
    },
    resolver: zodResolver(InstagramFeedFormSchema),
    shouldUnregister: true,
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        name: editData?.name ?? 'New feed',
        layout: {
          gap: editData?.layout.gap ?? 4,
          aspectRatio: editData?.layout.aspectRatio ?? 'square',
          mobilePosts: editData?.layout.mobilePosts ?? 1,
          tabletPosts: editData?.layout.tabletPosts ?? 4,
          desktopPosts: editData?.layout.desktopPosts ?? 6,
          mobileColumns: editData?.layout.mobileColumns ?? 1,
          tabletColumns: editData?.layout.tabletColumns ?? 4,
          desktopColumns: editData?.layout.desktopColumns ?? 6,
        },
        button: {
          enabled: editData?.button.enabled ?? false,
          link: editData?.button.link ?? 'https://aurora-sb.vercel.app/',
          text: editData?.button.text ?? 'Follow on Instagram',
        },
      });
    }
  }, [editData, form]);

  const instagramFeedFormUpdateMutation = useMutation({
    mutationFn: updateInstagramFeed,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        setEditOpen(false);
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

    if (!editData) {
      toast.error('Error updating feed');
      return;
    }

    instagramFeedFormUpdateMutation.mutate({
      feedId: editData.id,
      formData: data,
      formImages: selectedImages,
      userId: user.id,
    });
  };

  return { form, onSubmit, isPending: instagramFeedFormUpdateMutation.isPending };
}
