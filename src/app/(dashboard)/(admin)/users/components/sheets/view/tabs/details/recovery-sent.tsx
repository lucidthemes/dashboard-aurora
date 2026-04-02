import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsRecoverySent() {
  const { viewSheetUser } = useUsersStore();

  const recoverySentDate = viewSheetUser?.recovery_sent_at ? dateTimeFormat(viewSheetUser.recovery_sent_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Recovery sent at</h3>
      {recoverySentDate ? (
        <span className="text-sm text-muted-foreground">{recoverySentDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
