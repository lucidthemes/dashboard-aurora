'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { MediaEditFormSchema } from '@/schemas/media.schema';
import type { MediaEditForm } from '@/schemas/media.schema';
import { useMediaStore } from '@/store/media-store';

import { updateMedia } from '../update-media.action';

export default function useMediaEditForm() {
  const { editData, setEditOpen, setEditData } = useMediaStore();

  const form = useForm<MediaEditForm>({
    defaultValues: {
      alt_text: editData?.alt_text,
    },
    resolver: zodResolver(MediaEditFormSchema),
  });

  async function onSubmit(data: MediaEditForm) {
    if (!editData) return;

    const res = await updateMedia(editData.id, data);

    if (res.success) {
      toast.success('Successfully updated');
      setEditOpen(false);
      setEditData(null);
    } else {
      toast.error('Error updating image');
    }
  }

  return { form, onSubmit };
}
