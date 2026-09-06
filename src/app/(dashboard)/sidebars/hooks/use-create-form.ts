'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

// import { useInstagramFeedStore } from '../store/instagram-feed-store';
// import { createInstagramFeed } from '../actions/create-feed.action';
import { SidebarsFormSchema } from '../schemas/form/form.schema';
import type { SidebarsForm } from '../schemas/form/form.schema';

export default function useSidebarsCreateForm() {
  // const { setCreateOpen, selectedImages } = useInstagramFeedStore();

  const form = useForm<SidebarsForm>({
    defaultValues: {
      name: '',
      title: '',
      // layout: {
      //   gap: 4,
      //   aspectRatio: 'square',
      //   mobilePosts: 1,
      //   tabletPosts: 4,
      //   desktopPosts: 6,
      //   mobileColumns: 1,
      //   tabletColumns: 4,
      //   desktopColumns: 6,
      // },
      // button: {
      //   enabled: false,
      //   link: 'https://aurora-sb.vercel.app/',
      //   text: 'Follow on Instagram',
      // },
    },
    resolver: zodResolver(SidebarsFormSchema),
    //shouldUnregister: true,
  });

  // const instagramFeedFormCreateMutation = useMutation({
  //   mutationFn: createInstagramFeed,
  //   onSuccess: (result) => {
  //     if (result.success) {
  //       toast.success('Successfully created');
  //       setCreateOpen(false);
  //     } else {
  //       toast.error('Error creating feed');
  //     }
  //   },
  // });

  const onSubmit = async (data: SidebarsForm) => {
    console.log('submitted!');
    // if (selectedImages.length === 0) {
    //   toast.error('No feed images selected');
    //   return;
    // }

    //instagramFeedFormCreateMutation.mutate({ formData: data, formImages: selectedImages });
  };

  return {
    form,
    onSubmit,
    // isPending: instagramFeedFormCreateMutation.isPending
  };
}
