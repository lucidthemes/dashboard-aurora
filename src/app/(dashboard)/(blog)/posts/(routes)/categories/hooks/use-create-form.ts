'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePostsCategoriesStore } from '../store/posts-categories-store';
import createPostCategory from '../actions/create-post-category.action';
import type { PostsCategoriesForm } from '../schemas/form.schema';
import { PostsCategoriesFormSchema } from '../schemas/form.schema';

export default function usePostsCategoriesCreateSheetForm() {
  const { setCreateSheetOpen } = usePostsCategoriesStore();

  const form = useForm<PostsCategoriesForm>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
    resolver: zodResolver(PostsCategoriesFormSchema),
  });

  const postsCategoriesCreateFormMutation = useMutation({
    mutationFn: createPostCategory,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully created');
        setCreateSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error creating category');
      }
    },
  });

  const onSubmit = async (data: PostsCategoriesForm) => {
    postsCategoriesCreateFormMutation.mutate({ formData: data });
  };

  return { form, onSubmit, isPending: postsCategoriesCreateFormMutation.isPending };
}
