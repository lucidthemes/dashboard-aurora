import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ForgotPasswordFormSchema } from '@/schemas/auth/forgot-password.schema';
import type { ForgotPasswordForm } from '@/schemas/auth/forgot-password.schema';

export default function useForgotPasswordForm() {
  const form = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordFormSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    console.log(data); // temp
  };

  return { form, onSubmit };
}
