import { dateTimeFormat } from '@/lib/formatters';

import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsLastSignIn() {
  const { viewSheetUser } = useUsersStore();

  const lastSignInDate = viewSheetUser?.last_sign_in_at ? dateTimeFormat(viewSheetUser.last_sign_in_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Last sign in at</h3>
      {lastSignInDate ? (
        <span className="text-sm text-muted-foreground">{lastSignInDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
