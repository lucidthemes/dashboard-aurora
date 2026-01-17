import type { Metadata } from 'next';

import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to the Aurora dashboard',
};

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-sm text-balance">Sign in to your account</p>
      </div>
      <LoginForm />
    </>
  );
}
