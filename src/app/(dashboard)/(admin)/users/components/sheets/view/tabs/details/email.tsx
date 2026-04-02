import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsEmail() {
  const { viewSheetUser } = useUsersStore();

  if (!viewSheetUser?.email) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Email address</h3>
      <span className="text-sm text-muted-foreground">{viewSheetUser.email}</span>
    </div>
  );
}
