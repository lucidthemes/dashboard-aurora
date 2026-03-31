'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDashboardUser } from '../../../user-provider';
import { deleteAccount } from '../../actions/delete-account.action';
import type { AccountDeleteForm } from '../../schemas/delete-form.schema';
import { AccountDeleteFormSchema } from '../../schemas/delete-form.schema';

export default function useAccountDeleteForm(handleDialogOpen: () => void) {
  const { user } = useDashboardUser();

  const form = useForm<AccountDeleteForm>({
    defaultValues: {
      confirm: '',
    },
    resolver: zodResolver(AccountDeleteFormSchema),
  });

  const accountDeleteFormMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Successfully deleted');
        form.reset();
        handleDialogOpen();
      } else {
        toast.error('Error deleting account');
      }
    },
  });

  const onSubmit = async () => {
    const deleteAccountId = user.id;

    accountDeleteFormMutation.mutate(deleteAccountId);
  };

  return { form, onSubmit, isPending: accountDeleteFormMutation.isPending };
}
