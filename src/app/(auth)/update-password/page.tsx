import { Metadata } from 'next';

import { UpdatePasswordForm } from '@/components/update-password-form';

export const metadata: Metadata = {
  title: 'Dashboard - Update password',
  description: 'Save your new password',
};

export default function UpdatePasswordPage() {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold">Reset your password</h1>
        <p className="text-sm text-balance">Please enter your new password below.</p>
      </div>
      <UpdatePasswordForm />
    </>
  );
}
