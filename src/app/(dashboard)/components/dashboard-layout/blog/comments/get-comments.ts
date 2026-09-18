'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { DashboardPageLayoutBlogComments } from './comments.schema';
import { DashboardPageLayoutBlogCommentsSchema } from './comments.schema';

export default async function getDashboardPageLayoutBlogComments(): Promise<DashboardPageLayoutBlogComments[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts_comments')
    .select(
      `
        name,
        comment,
        created_at
    `,
    )
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    await createLogEvent('error', 'FETCH_DASHBOARD_BLOG_COMMENTS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(DashboardPageLayoutBlogCommentsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_DASHBOARD_BLOG_COMMENTS_INVALID_DATA',
      'Fetch dashboard blog comments failed schema validation',
    );

    return [];
  }

  return parsed.data;
}
