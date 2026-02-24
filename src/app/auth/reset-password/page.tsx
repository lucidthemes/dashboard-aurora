import { Metadata } from 'next';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Save your new password',
};

export default function ResetPasswordPage() {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold">Reset your password</h1>
        <p className="text-sm text-balance">Please enter your new password below.</p>
      </div>
      <ResetPasswordForm />
    </>
  );
}
