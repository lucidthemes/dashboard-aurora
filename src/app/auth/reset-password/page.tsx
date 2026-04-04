import { Metadata } from 'next';

import { PageHeading } from '@/components/page-headings';

import { ResetPasswordForm } from './form';

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Save your new password',
};

export default function ResetPasswordPage() {
  return (
    <>
      <PageHeading heading="Reset your password" subHeading="Enter your new password below" className="mb-0!" />
      <ResetPasswordForm />
    </>
  );
}
