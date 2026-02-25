import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ResetPasswordFormSchema } from '@/schemas/auth/reset-password.schema';
import type { ResetPasswordForm } from '@/schemas/auth/reset-password.schema';

export default function useResetPasswordForm() {
  const form = useForm<ResetPasswordForm>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(ResetPasswordFormSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    console.log(data); // temp
  };

  return { form, onSubmit };
}
