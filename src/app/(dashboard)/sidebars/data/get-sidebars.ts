import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { SidebarsListSchema } from '../schemas/list.schema';
import type { SidebarsList } from '../schemas/list.schema';

export default async function getSidebars(
  page: number,
  limit: number,
  search?: string,
  sort?: string,
): Promise<{ sidebars: SidebarsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (Number(page) - 1) * Number(limit);
  const rangeTo = Number(rangeFrom) + Number(limit) - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('sidebars')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    const isUUID = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

    if (isUUID(search)) {
      query = query.eq('id', search);
    } else {
      query = query.or(`name.ilike.%${search}%, title.ilike.%${search}%`);
    }
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_SIDEBARS_FAILED', error.message);

    return { sidebars: [], totalCount: 0 };
  }

  const parsed = z.array(SidebarsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_SIDEBARS_INVALID_DATA', 'Fetch sidebars failed schema validation');

    return { sidebars: [], totalCount: 0 };
  }

  return { sidebars: parsed.data, totalCount: count ?? 0 };
}
