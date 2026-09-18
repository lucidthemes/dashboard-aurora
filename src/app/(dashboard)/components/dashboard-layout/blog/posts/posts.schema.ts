import { z } from 'zod';

export const DashboardPageLayoutBlogPostsSchema = z.object({
  title: z.string(),
  author: z.object({
    name: z.string(),
  }),
  created_at: z.coerce.date(),
});

export type DashboardPageLayoutBlogPosts = z.infer<typeof DashboardPageLayoutBlogPostsSchema>;
