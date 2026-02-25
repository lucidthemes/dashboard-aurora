import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormSchema } from '@/schemas/auth/login.schema';
import type { LoginForm } from '@/schemas/auth/login.schema';

export default function useLoginForm() {
  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    console.log(data); // temp
  };

  return { form, onSubmit };
}
