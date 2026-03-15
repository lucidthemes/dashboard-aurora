import { z } from 'zod';

export const CustomerViewSheetOrdersSchema = z.object({
  order_id: z.uuid(),
  total: z.number().positive(),
  created_at: z.coerce.date(),
});

export type CustomerViewSheetOrders = z.infer<typeof CustomerViewSheetOrdersSchema>;
