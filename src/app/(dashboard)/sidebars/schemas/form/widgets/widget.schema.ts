import { z } from 'zod';

export const SidebarsFormWidgetSchema = z.object({
  id: z.uuid(),
  title: z.string().optional(),
});

export type SidebarsFormWidget = z.infer<typeof SidebarsFormWidgetSchema>;
