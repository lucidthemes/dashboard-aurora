import { z } from 'zod';

export const SidebarsFormWidgetSchema = z.object({
  id: z.uuid(),
  title: z.string().optional(),
  //order: z.int().positive(),
});

export type SidebarsFormWidget = z.infer<typeof SidebarsFormWidgetSchema>;
