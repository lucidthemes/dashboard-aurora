'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsCategoriesList } from '../schemas/categories-list.schema';
import { PostsCategoriesListSchema } from '../schemas/categories-list.schema';

export default async function getPostsCategories(
  page: number,
  limit: number,
  sort?: string,
): Promise<{ categories: PostsCategoriesList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  const { data, count, error } = await supabase
    .from('post_categories')
    .select()
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_CATEGORIES_FAILED', error.message);

    return { categories: [], totalCount: 0 };
  }

  const parsed = z.array(PostsCategoriesListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_POSTS_CATEGORIES_INVALID_DATA',
      'Fetch posts categories failed schema validation',
    );

    return { categories: [], totalCount: 0 };
  }

  return { categories: parsed.data, totalCount: count ?? 0 };
}
