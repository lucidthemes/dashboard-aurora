import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsEmailChange() {
  const { viewSheetUser } = useUsersStore();

  const emailChange = viewSheetUser?.email_change;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Email change</h3>
      {emailChange ? <p className="text-sm">{emailChange}</p> : <p>--</p>}
    </div>
  );
}
