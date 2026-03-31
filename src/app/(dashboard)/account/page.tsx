import { Metadata } from 'next';

import MainContainer from '@/app/(dashboard)/components/container';
import { PageHeading } from '@/components/page-headings';

import AccountName from './components/name';
import AccountEmail from './components/email';
import AccountPassword from './components/password';
import AccountAppearance from './components/appearance';
import AccountDelete from './components/delete';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Manage your account profile',
};

export default function AccountPage() {
  return (
    <MainContainer width="narrow">
      <PageHeading heading="Account" subHeading="Manage your account profile" />
      <div className="flex flex-col gap-10">
        <AccountName />
        <AccountEmail />
        <AccountPassword />
        <AccountAppearance />
        <AccountDelete />
      </div>
    </MainContainer>
  );
}
