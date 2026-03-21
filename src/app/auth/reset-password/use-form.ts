import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ResetPasswordFormSchema } from '@/app/auth/reset-password/reset-password.schema';
import type { ResetPasswordForm } from '@/app/auth/reset-password/reset-password.schema';

import { resetPassword } from './reset-password.action';

export default function useResetPasswordForm() {
  const form = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const resetPasswordFormMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Password successfully reset');
      } else {
        toast.error('Something went wrong. Please try again');
      }
    },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    resetPasswordFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: resetPasswordFormMutation.isPending };
}
