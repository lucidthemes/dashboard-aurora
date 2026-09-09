'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePostsCategoriesStore } from '../store/posts-categories-store';
import editPostCategory from '../actions/edit-post-category.action';
import type { PostsCategoriesForm } from '../schemas/form.schema';
import { PostsCategoriesFormSchema } from '../schemas/form.schema';

export default function usePostsCategoriesEditSheetForm() {
  const { editSheetPostCategory, setEditSheetOpen } = usePostsCategoriesStore(
    useShallow((state) => ({
      editSheetPostCategory: state.editSheetPostCategory,
      setEditSheetOpen: state.setEditSheetOpen,
    })),
  );

  const form = useForm<PostsCategoriesForm>({
    defaultValues: {
      name: editSheetPostCategory?.name ?? '',
      slug: editSheetPostCategory?.slug ?? '',
      description: editSheetPostCategory?.description ?? '',
    },
    resolver: zodResolver(PostsCategoriesFormSchema),
  });

  useEffect(() => {
    if (editSheetPostCategory) {
      form.reset({
        name: editSheetPostCategory?.name ?? '',
        slug: editSheetPostCategory?.slug ?? '',
        description: editSheetPostCategory?.description ?? '',
      });
    }
  }, [editSheetPostCategory, form]);

  const postsCategoriesEditFormMutation = useMutation({
    mutationFn: editPostCategory,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        setEditSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error updating category');
      }
    },
  });

  const onSubmit = async (data: PostsCategoriesForm) => {
    const categoryId = editSheetPostCategory?.id;

    if (!categoryId) return;

    postsCategoriesEditFormMutation.mutate({ categoryId, formData: data });
  };

  return { form, onSubmit, isPending: postsCategoriesEditFormMutation.isPending };
}
