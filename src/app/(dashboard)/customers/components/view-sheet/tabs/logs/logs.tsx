import { TabsContent } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/loading';

import { useCustomersStore } from '../../../../store/customers.store';
import useCustomerViewSheetTabLogs from '../../../../hooks/use-logs';
import CustomersViewSheetTabLogsTable from './table';

export default function CustomersViewSheetTabLogs() {
  const { viewSheetCustomer } = useCustomersStore();

  const customerId = viewSheetCustomer?.id ?? '';

  const viewSheetTabLogsQuery = useCustomerViewSheetTabLogs(customerId);

  return (
    <TabsContent value="logs">
      {viewSheetTabLogsQuery.isPending && <LoadingSpinner />}
      {viewSheetTabLogsQuery.isSuccess && <CustomersViewSheetTabLogsTable customerLogs={viewSheetTabLogsQuery.data} />}
    </TabsContent>
  );
}
