'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsCommentsList } from '../schemas/comments-list.schema';
import { PostsCommentsListSchema } from '../schemas/comments-list.schema';

export default async function getPostsComments(
  page: number,
  limit: number,
  search?: string,
  filterStatus?: string,
  sort?: string,
): Promise<{ comments: PostsCommentsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('post_comments')
    .select(
      `
        id,
        post:post_id (
            name
        ),
        reply_to,
        name,
        comment,
        status,
        created_at
    `,
    )
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    query = query.ilike('posts.title', `%${search}%`);
  }

  if (filterStatus) {
    query = query.eq('status', filterStatus);
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_COMMENTS_FAILED', error.message);

    return { comments: [], totalCount: 0 };
  }

  const parsed = z.array(PostsCommentsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_POSTS_COMMENTS_INVALID_DATA', 'Fetch posts comments failed schema validation');

    return { comments: [], totalCount: 0 };
  }

  return { comments: parsed.data, totalCount: count ?? 0 };
}
