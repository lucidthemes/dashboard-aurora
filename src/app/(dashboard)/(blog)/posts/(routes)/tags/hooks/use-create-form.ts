'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePostsTagsStore } from '../store/posts-tags-store';
import createPostTag from '../actions/create-post-tag.action';
import type { PostsTagsForm } from '../schemas/form.schema';
import { PostsTagsFormSchema } from '../schemas/form.schema';

export default function usePostsTagsCreateSheetForm() {
  const { setCreateSheetOpen } = usePostsTagsStore();

  const form = useForm<PostsTagsForm>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
    resolver: zodResolver(PostsTagsFormSchema),
  });

  const postsTagsCreateFormMutation = useMutation({
    mutationFn: createPostTag,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully created');
        setCreateSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error creating tag');
      }
    },
  });

  const onSubmit = async (data: PostsTagsForm) => {
    postsTagsCreateFormMutation.mutate({ formData: data });
  };

  return { form, onSubmit, isPending: postsTagsCreateFormMutation.isPending };
}
