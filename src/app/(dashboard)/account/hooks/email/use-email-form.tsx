'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';

import { editEmail } from '../../actions/edit-email.action';
import type { AccountEmailForm } from '../../schemas/email-form.schema';
import { AccountEmailFormSchema } from '../../schemas/email-form.schema';

export default function useAccountEmailForm(handleFormShown: () => void) {
  const { user } = useDashboardUser();

  const form = useForm<AccountEmailForm>({
    defaultValues: {
      email: user.email ?? '',
    },
    resolver: zodResolver(AccountEmailFormSchema),
  });

  const accountEmailFormMutation = useMutation({
    mutationFn: editEmail,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        handleFormShown();
      } else {
        toast.error('Error updating email');
      }
    },
  });

  const onSubmit = async (data: AccountEmailForm) => {
    accountEmailFormMutation.mutate({ formData: data });
  };

  return { form, onSubmit, isPending: accountEmailFormMutation.isPending };
}
