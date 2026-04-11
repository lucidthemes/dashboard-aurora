'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePostsTagsStore } from '../store/posts-tags-store';
import editPostTag from '../actions/edit-post-tag.action';
import type { PostsTagsForm } from '../schemas/form.schema';
import { PostsTagsFormSchema } from '../schemas/form.schema';

export default function usePostsTagsEditSheetForm() {
  const { setEditSheetOpen, editSheetPostTag } = usePostsTagsStore();

  const form = useForm<PostsTagsForm>({
    defaultValues: {
      name: editSheetPostTag?.name ?? '',
      slug: editSheetPostTag?.slug ?? '',
      description: editSheetPostTag?.description ?? '',
    },
    resolver: zodResolver(PostsTagsFormSchema),
  });

  useEffect(() => {
    if (editSheetPostTag) {
      form.reset({
        name: editSheetPostTag?.name ?? '',
        slug: editSheetPostTag?.slug ?? '',
        description: editSheetPostTag?.description ?? '',
      });
    }
  }, [editSheetPostTag, form]);

  const postsTagsEditFormMutation = useMutation({
    mutationFn: editPostTag,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        setEditSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error updating tag');
      }
    },
  });

  const onSubmit = async (data: PostsTagsForm) => {
    const tagId = editSheetPostTag?.id;

    if (!tagId) return;

    postsTagsEditFormMutation.mutate({ tagId, formData: data });
  };

  return { form, onSubmit, isPending: postsTagsEditFormMutation.isPending };
}
