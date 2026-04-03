'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editPassword } from '../../actions/edit-password.action';
import type { AccountPasswordForm } from '../../schemas/password-form.schema';
import { AccountPasswordFormSchema } from '../../schemas/password-form.schema';

export default function useAccountPasswordForm(handleFormShown: () => void) {
  const form = useForm<AccountPasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(AccountPasswordFormSchema),
  });

  const accountPasswordFormMutation = useMutation({
    mutationFn: editPassword,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        handleFormShown();
      } else {
        toast.error('Error updating password');
      }
    },
  });

  const onSubmit = async (data: AccountPasswordForm) => {
    accountPasswordFormMutation.mutate({ formData: data });
  };

  return { form, onSubmit, isPending: accountPasswordFormMutation.isPending };
}
