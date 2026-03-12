import { z } from 'zod';

const AddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  country: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  county: z.string().optional(),
  postcode: z.string(),
  phone: z.string().optional(),
});

export const CustomerSchema = z.object({
  id: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  shipping_address: AddressSchema.nullable(),
  billing_address: AddressSchema.nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Customer = z.infer<typeof CustomerSchema>;
