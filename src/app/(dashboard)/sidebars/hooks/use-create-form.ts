'use client';

import { useShallow } from 'zustand/react/shallow';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useSidebarsStore } from '../store/sidebars-store';
import { SidebarsFormSchema } from '../schemas/form/form.schema';
import type { SidebarsForm } from '../schemas/form/form.schema';
import { createSidebar } from '../actions/create-sidebar.action';

export default function useSidebarsCreateForm() {
  const { sidebarFormWidgets, setCreateSheetOpen, setEditSheetSidebar } = useSidebarsStore(
    useShallow((state) => ({
      sidebarFormWidgets: state.sidebarFormWidgets,
      setCreateSheetOpen: state.setCreateSheetOpen,
      setEditSheetSidebar: state.setEditSheetSidebar,
    })),
  );

  const form = useForm<SidebarsForm>({
    defaultValues: {
      name: '',
      title: '',
    },
    resolver: zodResolver(SidebarsFormSchema),
  });

  const sidebarFormCreateMutation = useMutation({
    mutationFn: createSidebar,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully created');

        form.reset();

        setCreateSheetOpen(false);
        setEditSheetSidebar(null);
      } else {
        toast.error('Error creating sidebar');
      }
    },
  });

  const onSubmit = async (data: SidebarsForm) => {
    sidebarFormCreateMutation.mutate({ formData: data, formWidgets: sidebarFormWidgets });
  };

  return {
    form,
    onSubmit,
    isPending: sidebarFormCreateMutation.isPending,
  };
}
