import { TabsContent } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/loading';

import { useUsersStore } from '../../../../../store/users-store';
import useUsersViewSheetTabLogs from '../../../../../hooks/use-logs';
import UsersViewSheetTabLogsTable from './table';

export default function UsersViewSheetTabLogs() {
  const { viewSheetUser } = useUsersStore();

  const userId = viewSheetUser?.id ?? '';

  const viewSheetTabLogsQuery = useUsersViewSheetTabLogs(userId);

  return (
    <TabsContent value="logs">
      {viewSheetTabLogsQuery.isPending && <LoadingSpinner />}
      {viewSheetTabLogsQuery.isSuccess && <UsersViewSheetTabLogsTable userLogs={viewSheetTabLogsQuery.data} />}
    </TabsContent>
  );
}
