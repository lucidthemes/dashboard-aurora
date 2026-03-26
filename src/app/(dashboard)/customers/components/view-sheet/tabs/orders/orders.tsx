import { TabsContent } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/loading';

import { useCustomersStore } from '../../../../store/customers.store';
import useCustomerViewSheetTabOrders from '../../../../hooks/use-orders';
import CustomersViewSheetTabOrdersTable from './table';

export default function CustomersViewSheetTabOrders() {
  const { viewSheetCustomer } = useCustomersStore();

  const customerId = viewSheetCustomer?.id ?? '';

  const viewSheetTabOrdersQuery = useCustomerViewSheetTabOrders(customerId);

  return (
    <TabsContent value="orders">
      {viewSheetTabOrdersQuery.isPending && <LoadingSpinner />}
      {viewSheetTabOrdersQuery.isSuccess && (
        <CustomersViewSheetTabOrdersTable customerOrders={viewSheetTabOrdersQuery.data} />
      )}
    </TabsContent>
  );
}
