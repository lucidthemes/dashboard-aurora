'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsListFilterAuthor } from '../../schemas/filters/author.schema';
import { PostsListFilterAuthorSchema } from '../../schemas/filters/author.schema';

export default async function getPostsListFilterAuthors(): Promise<PostsListFilterAuthor[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('post_authors').select('id, name, slug');

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_FILTER_AUTHOR_FAILED', error.message);

    return [];
  }

  const parsed = z.array(PostsListFilterAuthorSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_POSTS_FILTER_AUTHOR_INVALID_DATA',
      'Fetch posts filter author failed schema validation',
    );

    return [];
  }

  return parsed.data;
}
