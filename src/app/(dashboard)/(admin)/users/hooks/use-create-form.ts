'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUsersStore } from '../store/users-store';
import { createUser } from '../actions/create-user.action';
import type { UsersCreateSheetForm } from '../schemas/sheets/create-form.schema';
import { UsersCreateSheetFormSchema } from '../schemas/sheets/create-form.schema';

export default function useUsersCreateSheetForm() {
  const { setCreateSheetOpen } = useUsersStore();

  const form = useForm<UsersCreateSheetForm>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(UsersCreateSheetFormSchema),
  });

  const usersCreateFormMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully invited email');
        setCreateSheetOpen(false);
        form.reset();
      } else {
        toast.error('Error inviting email');
      }
    },
  });

  const onSubmit = async (data: UsersCreateSheetForm) => {
    usersCreateFormMutation.mutate({ createUserEmail: data.email });
  };

  return { form, onSubmit, isPending: usersCreateFormMutation.isPending };
}
