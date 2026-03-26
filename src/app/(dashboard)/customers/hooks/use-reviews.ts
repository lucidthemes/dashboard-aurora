import { useQuery } from '@tanstack/react-query';

import getCustomerViewSheetReviews from '../data/view-sheet/get-reviews';
import type { CustomerViewSheetReviews } from '../schemas/view-sheet/reviews.schema';

export default function useCustomerViewSheetTabReviews(customerId: string) {
  const viewSheetTabReviewsQuery = useQuery<CustomerViewSheetReviews[]>({
    queryKey: ['customersViewSheetTabReviews', customerId],
    queryFn: () => getCustomerViewSheetReviews(customerId ?? null),
    enabled: !!customerId,
  });

  return viewSheetTabReviewsQuery;
}
