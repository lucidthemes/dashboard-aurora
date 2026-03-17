import { z } from 'zod';

import { CustomerSchema } from '@/schemas/customer.schema';

export const CustomersListSchema = CustomerSchema.extend({
  email: z.email(),
});

export type CustomersList = z.infer<typeof CustomersListSchema>;
