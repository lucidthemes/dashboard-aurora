'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePostsAuthorsStore } from '../store/posts-authors-store';
import editPostAuthor from '../actions/edit-post-author.action';
import type { PostsAuthorsForm } from '../schemas/form.schema';
import { PostsAuthorsFormSchema } from '../schemas/form.schema';

export default function usePostsAuthorsEditSheetForm() {
  const { setEditSheetOpen, editSheetPostAuthor } = usePostsAuthorsStore();

  const form = useForm<PostsAuthorsForm>({
    defaultValues: {
      name: editSheetPostAuthor?.name ?? '',
      slug: editSheetPostAuthor?.slug ?? '',
      description: editSheetPostAuthor?.description ?? '',
    },
    resolver: zodResolver(PostsAuthorsFormSchema),
  });

  useEffect(() => {
    if (editSheetPostAuthor) {
      form.reset({
        name: editSheetPostAuthor?.name ?? '',
        slug: editSheetPostAuthor?.slug ?? '',
        description: editSheetPostAuthor?.description ?? '',
      });
    }
  }, [editSheetPostAuthor, form]);

  const postsAuthorsEditFormMutation = useMutation({
    mutationFn: editPostAuthor,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        setEditSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error updating author');
      }
    },
  });

  const onSubmit = async (data: PostsAuthorsForm) => {
    const authorId = editSheetPostAuthor?.id;

    if (!authorId) return;

    postsAuthorsEditFormMutation.mutate({ authorId, formData: data });
  };

  return { form, onSubmit, isPending: postsAuthorsEditFormMutation.isPending };
}
