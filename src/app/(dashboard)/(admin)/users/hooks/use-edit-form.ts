'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useUsersStore } from '../store/users-store';
import { updateUser } from '../actions/update-user.action';
import type { UsersEditSheetForm } from '../schemas/sheets/edit-form.schema';
import { UsersEditSheetFormSchema } from '../schemas/sheets/edit-form.schema';

export default function useUsersEditSheetForm() {
  const { editSheetUser, setEditSheetOpen, setEditSheetUser } = useUsersStore();

  const form = useForm<UsersEditSheetForm>({
    defaultValues: {
      role: editSheetUser?.role,
    },
    resolver: zodResolver(UsersEditSheetFormSchema),
  });

  useEffect(() => {
    if (editSheetUser) {
      form.reset({
        role: editSheetUser.role,
      });
    }
  }, [editSheetUser, form]);

  const usersEditFormMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        setEditSheetOpen(false);
        setEditSheetUser(null);
      } else {
        toast.error('Error updating user');
      }
    },
  });

  const onSubmit = async (data: UsersEditSheetForm) => {
    if (!editSheetUser) return null;

    usersEditFormMutation.mutate({ updateUserId: editSheetUser?.id, updateUserRole: data.role });
  };

  return { form, onSubmit, isPending: usersEditFormMutation.isPending };
}
