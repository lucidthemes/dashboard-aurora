'use client';

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useSidebarsStore } from '../store/sidebars-store';
import { SidebarsFormSchema } from '../schemas/form/form.schema';
import type { SidebarsForm } from '../schemas/form/form.schema';
import { updateSidebar } from '../actions/update-sidebar.action';

export default function useSidebarsEditForm() {
  const { editSheetSidebar, sidebarFormWidgets, setEditSheetOpen, setEditSheetSidebar } = useSidebarsStore(
    useShallow((state) => ({
      editSheetSidebar: state.editSheetSidebar,
      sidebarFormWidgets: state.sidebarFormWidgets,
      setEditSheetOpen: state.setEditSheetOpen,
      setEditSheetSidebar: state.setEditSheetSidebar,
    })),
  );

  const form = useForm<SidebarsForm>({
    defaultValues: {
      name: editSheetSidebar?.name ?? '',
      title: editSheetSidebar?.title ?? '',
    },
    resolver: zodResolver(SidebarsFormSchema),
  });

  useEffect(() => {
    if (editSheetSidebar) {
      form.reset({
        name: editSheetSidebar?.name ?? '',
        title: editSheetSidebar?.title ?? '',
      });
    }
  }, [editSheetSidebar, form]);

  const sidebarFormUpdateMutation = useMutation({
    mutationFn: updateSidebar,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');

        form.reset();

        setEditSheetOpen(false);
        setEditSheetSidebar(null);
      } else {
        toast.error('Error updating sidebar');
      }
    },
  });

  const onSubmit = async (data: SidebarsForm) => {
    if (!editSheetSidebar) {
      toast.error('Error updating sidebar');
      return;
    }

    sidebarFormUpdateMutation.mutate({
      sidebarId: editSheetSidebar.id,
      formData: data,
      formWidgets: sidebarFormWidgets,
    });
  };

  return {
    form,
    onSubmit,
    isPending: sidebarFormUpdateMutation.isPending,
  };
}
