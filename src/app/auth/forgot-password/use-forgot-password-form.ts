import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ForgotPasswordFormSchema } from '@/schemas/auth/forgot-password.schema';
import type { ForgotPasswordForm } from '@/schemas/auth/forgot-password.schema';

import { forgotPassword } from './forgot-password.action';

export default function useForgotPasswordForm() {
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const forgotPasswordFormMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Password reset email sent');
      } else {
        toast.error('Something went wrong. Please try again');
      }
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    forgotPasswordFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: forgotPasswordFormMutation.isPending };
}
