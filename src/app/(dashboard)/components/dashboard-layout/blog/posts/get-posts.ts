'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { DashboardPageLayoutBlogPosts } from './posts.schema';
import { DashboardPageLayoutBlogPostsSchema } from './posts.schema';

export default async function getDashboardPageLayoutBlogPosts(): Promise<DashboardPageLayoutBlogPosts[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
        title,
        author:author_id (
            name
        ),
        created_at
    `,
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    await createLogEvent('error', 'FETCH_DASHBOARD_BLOG_POSTS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(DashboardPageLayoutBlogPostsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_DASHBOARD_BLOG_POSTS_INVALID_DATA',
      'Fetch dashboard blog posts failed schema validation',
    );

    return [];
  }

  return parsed.data;
}
