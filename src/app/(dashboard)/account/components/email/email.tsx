'use client';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';
import { PageHeading } from '@/components/page-headings';

import useAccountEmail from '../../hooks/email/use-email';
import AccountEmailEditButton from './button';
import AccountEmailForm from './form';

export default function AccountEmail() {
  const { user } = useDashboardUser();

  const { formShown, handleFormShown } = useAccountEmail();

  return (
    <div className="flex flex-col gap-5">
      <PageHeading heading="Email" headingLevel={2} subHeading="Update your email address" className="mb-0!" />
      <div className="flex flex-col gap-4 rounded-md border border-1 p-5">
        <div className="flex items-center justify-between">
          {<span className="text-sm text-muted-foreground">{user.email}</span>}
          <AccountEmailEditButton handleFormShown={handleFormShown} />
        </div>
        {formShown && <AccountEmailForm handleFormShown={handleFormShown} />}
      </div>
    </div>
  );
}
