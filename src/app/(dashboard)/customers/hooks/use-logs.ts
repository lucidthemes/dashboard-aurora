import { useQuery } from '@tanstack/react-query';

import getCustomerViewSheetLogs from '../data/view-sheet/get-logs';
import type { CustomerViewSheetLogs } from '../schemas/view-sheet/logs.schema';

export default function useCustomerViewSheetTabLogs(customerId: string) {
  const viewSheetTabLogsQuery = useQuery<CustomerViewSheetLogs[]>({
    queryKey: ['customersViewSheetTabLogs', customerId],
    queryFn: () => getCustomerViewSheetLogs(customerId ?? null),
    enabled: !!customerId,
  });

  return viewSheetTabLogsQuery;
}
