import { TabsContent } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/loading';

import { useCustomersStore } from '../../../../store/customers.store';
import useCustomerViewSheetTabReviews from '../../../../hooks/use-reviews';
import CustomersViewSheetTabReviewsTable from './table';

export default function CustomersViewSheetTabReviews() {
  const { viewSheetCustomer } = useCustomersStore();

  const customerId = viewSheetCustomer?.id ?? '';

  const viewSheetTabReviewsQuery = useCustomerViewSheetTabReviews(customerId);

  return (
    <TabsContent value="reviews">
      {viewSheetTabReviewsQuery.isPending && <LoadingSpinner />}
      {viewSheetTabReviewsQuery.isSuccess && (
        <CustomersViewSheetTabReviewsTable customerReviews={viewSheetTabReviewsQuery.data} />
      )}
    </TabsContent>
  );
}
