import { useUsersStore } from '../../../../../store/users-store';

export default function UsersViewSheetTabDetailsRole() {
  const { viewSheetUser } = useUsersStore();

  const role = viewSheetUser?.role;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Role</h3>
      {role ? <p className="text-sm capitalize">{role}</p> : <p>--</p>}
    </div>
  );
}
