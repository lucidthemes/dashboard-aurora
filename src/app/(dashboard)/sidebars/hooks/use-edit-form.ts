'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useSidebarsStore } from '../store/sidebars-store';
// import { updateInstagramFeed } from '../actions/update-feed.action';
import { SidebarsFormSchema } from '../schemas/form/form.schema';
import type { SidebarsForm } from '../schemas/form/form.schema';

export default function useSidebarsEditForm() {
  // const { setEditOpen, editData, selectedImages } = useInstagramFeedStore();

  const { setEditSheetOpen, editSheetSidebar } = useSidebarsStore(
    useShallow((state) => ({
      setEditSheetOpen: state.setEditSheetOpen,
      editSheetSidebar: state.editSheetSidebar,
    })),
  );

  const form = useForm<SidebarsForm>({
    defaultValues: {
      name: editSheetSidebar?.name ?? '',
      title: editSheetSidebar?.title ?? '',
      // layout: {
      //   gap: editData?.layout.gap ?? 4,
      //   aspectRatio: editData?.layout.aspectRatio ?? 'square',
      //   mobilePosts: editData?.layout.mobilePosts ?? 1,
      //   tabletPosts: editData?.layout.tabletPosts ?? 4,
      //   desktopPosts: editData?.layout.desktopPosts ?? 6,
      //   mobileColumns: editData?.layout.mobileColumns ?? 1,
      //   tabletColumns: editData?.layout.tabletColumns ?? 4,
      //   desktopColumns: editData?.layout.desktopColumns ?? 6,
      // },
      // button: {
      //   enabled: editData?.button.enabled ?? false,
      //   link: editData?.button.link ?? 'https://aurora-sb.vercel.app/',
      //   text: editData?.button.text ?? 'Follow on Instagram',
      // },
    },
    resolver: zodResolver(SidebarsFormSchema),
    //shouldUnregister: true,
  });

  useEffect(() => {
    if (editSheetSidebar) {
      form.reset({
        name: editSheetSidebar?.name ?? '',
        title: editSheetSidebar?.title ?? '',
        // layout: {
        //   gap: editData?.layout.gap ?? 4,
        //   aspectRatio: editData?.layout.aspectRatio ?? 'square',
        //   mobilePosts: editData?.layout.mobilePosts ?? 1,
        //   tabletPosts: editData?.layout.tabletPosts ?? 4,
        //   desktopPosts: editData?.layout.desktopPosts ?? 6,
        //   mobileColumns: editData?.layout.mobileColumns ?? 1,
        //   tabletColumns: editData?.layout.tabletColumns ?? 4,
        //   desktopColumns: editData?.layout.desktopColumns ?? 6,
        // },
        // button: {
        //   enabled: editData?.button.enabled ?? false,
        //   link: editData?.button.link ?? 'https://aurora-sb.vercel.app/',
        //   text: editData?.button.text ?? 'Follow on Instagram',
        // },
      });
    }
  }, [editSheetSidebar, form]);

  // const instagramFeedFormUpdateMutation = useMutation({
  //   mutationFn: updateInstagramFeed,
  //   onSuccess: (result) => {
  //     if (result.success) {
  //       toast.success('Successfully updated');
  //       setEditOpen(false);
  //     } else {
  //       toast.error('Error updating feed');
  //     }
  //   },
  // });

  const onSubmit = async (data: SidebarsForm) => {
    console.log('submitted!');
    // if (selectedImages.length === 0) {
    //   toast.error('No feed images selected');
    //   return;
    // }

    // if (!editData) {
    //   toast.error('Error updating feed');
    //   return;
    // }

    // instagramFeedFormUpdateMutation.mutate({
    //   feedId: editData.id,
    //   formData: data,
    //   formImages: selectedImages,
    // });
  };

  return {
    form,
    onSubmit,
    //  isPending: instagramFeedFormUpdateMutation.isPending
  };
}
