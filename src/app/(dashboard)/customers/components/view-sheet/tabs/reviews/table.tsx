'use client';

import { DataTable } from '@/components/ui/data-table';

import CustomersViewSheetTabReviewsColumns from './columns';
import type { CustomerViewSheetReviews } from '../../../../schemas/view-sheet/reviews.schema';

export default function CustomersViewSheetTabReviewsTable({
  customerReviews,
}: {
  customerReviews: CustomerViewSheetReviews[];
}) {
  const customersViewSheetTabReviewsColumns = CustomersViewSheetTabReviewsColumns();

  return <DataTable columns={customersViewSheetTabReviewsColumns} data={customerReviews} />;
}
