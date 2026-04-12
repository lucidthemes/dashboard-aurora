'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { usePostsAuthorsStore } from '../store/posts-authors-store';
import createPostAuthor from '../actions/create-post-author.action';
import type { PostsAuthorsForm } from '../schemas/form.schema';
import { PostsAuthorsFormSchema } from '../schemas/form.schema';

export default function usePostsAuthorsCreateSheetForm() {
  const { setCreateSheetOpen } = usePostsAuthorsStore();

  const form = useForm<PostsAuthorsForm>({
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
    resolver: zodResolver(PostsAuthorsFormSchema),
  });

  const postsAuthorsCreateFormMutation = useMutation({
    mutationFn: createPostAuthor,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully created');
        setCreateSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error creating author');
      }
    },
  });

  const onSubmit = async (data: PostsAuthorsForm) => {
    postsAuthorsCreateFormMutation.mutate({ formData: data });
  };

  return { form, onSubmit, isPending: postsAuthorsCreateFormMutation.isPending };
}
