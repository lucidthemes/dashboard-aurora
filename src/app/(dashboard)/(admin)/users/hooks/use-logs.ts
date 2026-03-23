import { useQuery } from '@tanstack/react-query';

import getUsersViewSheetLogs from '../data/get-logs';
import type { UsersViewSheetLogs } from '../schemas/sheets/logs.schema';

export default function useUsersViewSheetTabLogs(userId: string) {
  const viewSheetTabLogsQuery = useQuery<UsersViewSheetLogs[]>({
    queryKey: ['customersViewSheetTabLogs', userId],
    queryFn: () => getUsersViewSheetLogs(userId ?? null),
    enabled: !!userId,
  });

  return viewSheetTabLogsQuery;
}
