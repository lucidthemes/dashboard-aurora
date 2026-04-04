import type { Metadata } from 'next';

import { PageHeading } from '@/components/page-headings';

import { LoginForm } from './form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to the Aurora dashboard',
};

export default function LoginPage() {
  return (
    <>
      <PageHeading heading="Welcome back" subHeading="Sign in to your account" className="mb-0!" />
      <LoginForm />
    </>
  );
}
