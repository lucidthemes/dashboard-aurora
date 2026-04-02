import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsEmailChange() {
  const { viewSheetUser } = useUsersStore();

  const emailChange = viewSheetUser?.email_change;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Email change</h3>
      {emailChange ? (
        <span className="text-sm text-muted-foreground">{emailChange}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
