import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsRecoverySent() {
  const { viewSheetUser } = useUsersStore();

  const recoverySentDate = viewSheetUser?.recovery_sent_at ? dateTimeFormat(viewSheetUser.recovery_sent_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Recovery sent at</h3>
      {recoverySentDate ? <p className="text-sm">{recoverySentDate}</p> : <p>--</p>}
    </div>
  );
}
