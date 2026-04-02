import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsEmailChangeSent() {
  const { viewSheetUser } = useUsersStore();

  const emailChangeSentDate = viewSheetUser?.email_change_sent_at
    ? dateTimeFormat(viewSheetUser.email_change_sent_at)
    : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Email change sent at</h3>
      {emailChangeSentDate ? (
        <span className="text-sm text-muted-foreground">{emailChangeSentDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
