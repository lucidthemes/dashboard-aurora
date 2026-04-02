import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsEmailConfirmed() {
  const { viewSheetUser } = useUsersStore();

  const emailConfirmedDate = viewSheetUser?.email_confirmed_at
    ? dateTimeFormat(viewSheetUser.email_confirmed_at)
    : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Email confirmed at</h3>
      {emailConfirmedDate ? (
        <span className="text-sm text-muted-foreground">{emailConfirmedDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
