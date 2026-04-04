import { Metadata } from 'next';

import { PageHeading } from '@/components/page-headings';

import { ForgotPasswordForm } from './form';

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Reset your forgotten password',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <PageHeading
        heading="Forgot your password?"
        subHeading="Enter your email and we'll send you a link to reset it"
        className="mb-0!"
      />
      <ForgotPasswordForm />
    </>
  );
}
