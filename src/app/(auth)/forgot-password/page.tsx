import { Metadata } from 'next';

import { ForgotPasswordForm } from '@/components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Dashboard - Forgot password',
  description: 'Reset your forgotten password',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold">Forgot your password?</h1>
        <p className="text-sm text-balance">Enter your email and we&apos;ll send you a link to reset it</p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
