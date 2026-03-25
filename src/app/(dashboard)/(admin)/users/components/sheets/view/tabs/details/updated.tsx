import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsUpdated() {
  const { viewSheetUser } = useUsersStore();

  const updatedDate = viewSheetUser?.updated_at ? dateTimeFormat(viewSheetUser.updated_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Updated at</h3>
      {updatedDate ? <p className="text-sm">{updatedDate}</p> : <p>--</p>}
    </div>
  );
}
