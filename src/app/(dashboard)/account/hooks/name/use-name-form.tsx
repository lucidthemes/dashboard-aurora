'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';

import { editName } from '../../actions/edit-name.action';
import type { AccountNameForm } from '../../schemas/name-form.schema';
import { AccountNameFormSchema } from '../../schemas/name-form.schema';

export default function useAccountNameForm(handleFormShown: () => void) {
  const { user, customer } = useDashboardUser();

  const form = useForm<AccountNameForm>({
    defaultValues: {
      first_name: customer.first_name ?? '',
      last_name: customer.last_name ?? '',
    },
    resolver: zodResolver(AccountNameFormSchema),
  });

  const accountNameFormMutation = useMutation({
    mutationFn: editName,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully updated');
        handleFormShown();
      } else {
        toast.error('Error updating name');
      }
    },
  });

  const onSubmit = async (data: AccountNameForm) => {
    accountNameFormMutation.mutate({ formData: data, userId: user.id });
  };

  return { form, onSubmit, isPending: accountNameFormMutation.isPending };
}
