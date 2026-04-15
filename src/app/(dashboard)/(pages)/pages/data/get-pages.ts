'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PagesList } from '../schemas/pages-list.schema';
import { PagesListSchema } from '../schemas/pages-list.schema';

export default async function getPages(
  page: number,
  limit: number,
  search?: string,
  filterStatus?: string,
  sort?: string,
): Promise<{ pages: PagesList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('pages')
    .select('id, title, status, created_at, updated_at')
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

  if (filterStatus) {
    query = query.eq('status', filterStatus);
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_PAGES_FAILED', error.message);

    return { pages: [], totalCount: 0 };
  }

  const parsed = z.array(PagesListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_PAGES_INVALID_DATA', 'Fetch pages failed schema validation');

    return { pages: [], totalCount: 0 };
  }

  return { pages: parsed.data, totalCount: count ?? 0 };
}
