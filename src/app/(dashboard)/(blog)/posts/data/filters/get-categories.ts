'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsListFilterCategory } from '../../schemas/filters/category.schema';
import { PostsListFilterCategorySchema } from '../../schemas/filters/category.schema';

export default async function getPostsListFilterCategories(): Promise<PostsListFilterCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('post_categories').select('id, name, slug');

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_FILTER_CATEGORY_FAILED', error.message);

    return [];
  }

  const parsed = z.array(PostsListFilterCategorySchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_POSTS_FILTER_CATEGORY_INVALID_DATA',
      'Fetch posts filter category failed schema validation',
    );

    return [];
  }

  return parsed.data;
}
