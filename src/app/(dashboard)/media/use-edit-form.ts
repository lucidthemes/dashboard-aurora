'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MediaEditFormSchema } from '@/schemas/media.schema';
import type { MediaEditForm } from '@/schemas/media.schema';
import { useMediaStore } from '@/store/media-store';

import { updateMedia } from './update-media.action';

export default function useMediaEditForm() {
  const { editData, setEditOpen, setEditData } = useMediaStore();

  const form = useForm<MediaEditForm>({
    defaultValues: {
      alt_text: editData?.alt_text ?? '',
    },
    resolver: zodResolver(MediaEditFormSchema),
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        alt_text: editData.alt_text ?? '',
      });
    }
  }, [editData, form]);

  const mediaEditFormMutation = useMutation({
    mutationFn: updateMedia,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        setEditOpen(false);
        setEditData(null);
      } else {
        toast.error('Error updating image');
      }
    },
  });

  const onSubmit = async (data: MediaEditForm) => {
    if (!editData) return;

    mediaEditFormMutation.mutate({ mediaId: editData.id, formData: data });
  };

  return { form, onSubmit, isPending: mediaEditFormMutation.isPending };
}
