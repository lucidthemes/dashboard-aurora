import { Tabs } from '@/components/ui/tabs';

import UsersViewSheetTabsList from './tabs/list';
import UsersViewSheetTabDetails from './tabs/details';
import UsersViewSheetTabLogs from './tabs/logs';

export default function UsersViewSheetContent() {
  return (
    <Tabs defaultValue="details" className="flex flex-col gap-y-5">
      <UsersViewSheetTabsList />
      <UsersViewSheetTabDetails />
      <UsersViewSheetTabLogs />
    </Tabs>
  );
}
