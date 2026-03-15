import { z } from 'zod';

import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { CustomerViewSheetReviews } from '../../schemas/view-sheet/reviews.schema';
import { CustomerViewSheetReviewsSchema } from '../../schemas/view-sheet/reviews.schema';

export default async function getCustomerViewSheetReviews(customerId: string): Promise<CustomerViewSheetReviews[]> {
  if (!customerId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from('reviews')
    .select('product_id, rating, created_at')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    createLogEvent('error', 'FETCH_CUSTOMER_REVIEWS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(CustomerViewSheetReviewsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    createLogEvent('error', 'FETCH_CUSTOMER_REVIEWS_INVALID_DATA', 'Fetch customer reviews failed schema validation');

    return [];
  }

  return data;
}
