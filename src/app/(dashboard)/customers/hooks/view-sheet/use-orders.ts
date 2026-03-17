import { useQuery } from '@tanstack/react-query';

import getCustomerViewSheetOrders from '../../data/view-sheet/get-orders';
import type { CustomerViewSheetOrders } from '../../schemas/view-sheet/orders.schema';

export default function useCustomerViewSheetTabOrders(customerId: string) {
  const viewSheetTabOrdersQuery = useQuery<CustomerViewSheetOrders[]>({
    queryKey: ['customersViewSheetTabOrders', customerId],
    queryFn: () => getCustomerViewSheetOrders(customerId ?? null),
    enabled: !!customerId,
  });

  return viewSheetTabOrdersQuery;
}
