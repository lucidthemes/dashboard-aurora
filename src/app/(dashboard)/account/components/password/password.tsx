'use client';

import { PageHeading } from '@/components/page-headings';

import useAccountPassword from '../../hooks/password/use-password';
import AccountPasswordEditButton from './button';
import AccountPasswordForm from './form';

export default function AccountPassword() {
  const { formShown, handleFormShown } = useAccountPassword();

  return (
    <div className="flex flex-col gap-5">
      <PageHeading heading="Password" headingLevel={2} subHeading="Update your password" className="mb-0!" />
      <div className="flex flex-col gap-4 rounded-md border border-1 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">••••••••</span>
          <AccountPasswordEditButton handleFormShown={handleFormShown} />
        </div>
        {formShown && <AccountPasswordForm handleFormShown={handleFormShown} />}
      </div>
    </div>
  );
}
