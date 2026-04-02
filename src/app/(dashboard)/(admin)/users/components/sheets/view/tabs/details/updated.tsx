import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsUpdated() {
  const { viewSheetUser } = useUsersStore();

  const updatedDate = viewSheetUser?.updated_at ? dateTimeFormat(viewSheetUser.updated_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Updated at</h3>
      {updatedDate ? (
        <span className="text-sm text-muted-foreground">{updatedDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
