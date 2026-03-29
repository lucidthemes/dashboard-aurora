'use client';

import { useDashboardUser } from '@/app/(dashboard)/user-provider';
import { PageHeading } from '@/components/page-headings';

import useAccountName from '../../hooks/name/use-name';
import AccountNameEditButton from './button';
import AccountNameForm from './form';

export default function AccountName() {
  const { customer } = useDashboardUser();

  const { formShown, handleFormShown } = useAccountName();

  return (
    <div className="flex flex-col gap-5">
      <PageHeading heading="Name" headingLevel={2} subHeading="Update your first and last name" className="mb-0!" />
      <div className="flex flex-col gap-4 rounded-md border border-1 p-5">
        <div className="flex items-center justify-between">
          {customer.first_name || customer.last_name ? (
            <div className="flex gap-1 text-sm text-muted-foreground">
              {customer.first_name && <span>{customer.first_name}</span>}
              {customer.last_name && <span>{customer.last_name}</span>}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">You have not specified a name</span>
          )}
          <AccountNameEditButton handleFormShown={handleFormShown} />
        </div>
        {formShown && <AccountNameForm handleFormShown={handleFormShown} />}
      </div>
    </div>
  );
}
