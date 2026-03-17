import { z } from 'zod';

export const CustomerViewSheetReviewsSchema = z.object({
  product_id: z.uuid(),
  rating: z.int().positive(),
  created_at: z.coerce.date(),
});

export type CustomerViewSheetReviews = z.infer<typeof CustomerViewSheetReviewsSchema>;
