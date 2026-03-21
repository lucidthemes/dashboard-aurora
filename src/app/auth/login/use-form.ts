import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LoginFormSchema } from '@/app/auth/login/login.schema';
import type { LoginForm } from '@/app/auth/login/login.schema';

import { signIn } from './sign-in.action';

export default function useLoginForm() {
  const router = useRouter();

  const form = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const loginFormMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (result) => {
      if (result.success) {
        router.push('/');
      } else {
        toast.error('Invalid login credentials');
      }
    },
  });

  const onSubmit = async (data: LoginForm) => {
    loginFormMutation.mutate(data);
  };

  return { form, onSubmit, isPending: loginFormMutation.isPending };
}
