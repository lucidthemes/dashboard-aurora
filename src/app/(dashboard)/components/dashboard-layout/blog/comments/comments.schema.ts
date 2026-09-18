import { z } from 'zod';

export const DashboardPageLayoutBlogCommentsSchema = z.object({
  name: z.string(),
  comment: z.string(),
  created_at: z.coerce.date(),
});

export type DashboardPageLayoutBlogComments = z.infer<typeof DashboardPageLayoutBlogCommentsSchema>;
