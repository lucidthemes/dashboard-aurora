'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { editMedia } from '@/actions/media.actions';
import { MediaEditFormSchema } from '@/schemas/media.schema';
import { useMediaStore } from '@/store/media-store';

export default function useMediaEditForm() {
  const { editData, setEditOpen, setEditData } = useMediaStore();

  const form = useForm<z.infer<typeof MediaEditFormSchema>>({
    defaultValues: {
      alt_text: editData?.alt_text,
    },
    resolver: zodResolver(MediaEditFormSchema),
  });

  async function onSubmit(data: z.infer<typeof MediaEditFormSchema>) {
    if (!editData) return;

    const res = await editMedia(editData.id, data);

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
