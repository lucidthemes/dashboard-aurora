'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsList } from '../schemas/posts-list.schema';
import { PostsListSchema } from '../schemas/posts-list.schema';

export default async function getPosts(
  page: number,
  limit: number,
  search?: string,
  filterAuthor?: string,
  filterCategory?: string,
  filterTag?: string,
  filterStatus?: string,
  sort?: string,
): Promise<{ posts: PostsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('posts')
    .select(
      `
        id,
        title,
        author:author_id (
            name
        ),
        categories:posts_categories (
            category:post_categories  (
                id,
                name
            )
        ),
        tags:posts_tags (
            tag:post_tags (
                id,
                name
            )
        )
    `,
    )
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    const isUUID = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

    if (isUUID(search)) {
      query = query.eq('id', search);
    } else {
      query = query.ilike('title', `%${search}%`);
    }
  }

  if (filterAuthor) {
    query = query.eq('post_authors.slug', filterAuthor);
  }

  if (filterCategory) {
    query = query.eq('posts_categories.post_categories.slug', filterCategory);
  }

  if (filterTag) {
    query = query.eq('posts_tags.post_tags.slug', filterTag);
  }

  if (filterStatus) {
    query = query.eq('status', filterStatus);
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_FAILED', error.message);

    return { posts: [], totalCount: 0 };
  }

  const parsed = z.array(PostsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_POSTS_INVALID_DATA', 'Fetch posts failed schema validation');

    return { posts: [], totalCount: 0 };
  }

  return { posts: parsed.data, totalCount: count ?? 0 };
}
