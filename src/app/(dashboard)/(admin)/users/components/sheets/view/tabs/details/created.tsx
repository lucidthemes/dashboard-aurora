import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsCreated() {
  const { viewSheetUser } = useUsersStore();

  const createdDate = viewSheetUser?.created_at ? dateTimeFormat(viewSheetUser.created_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Created at</h3>
      {createdDate ? (
        <span className="text-sm text-muted-foreground">{createdDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
