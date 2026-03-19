'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { LogsList } from '../schemas/logs-list.schema';
import { LogsListSchema } from '../schemas/logs-list.schema';

export default async function getLogs(
  page: number,
  limit: number,
  search?: string,
  filterLogLevel?: string,
  filterEventName?: string,
  filter_source?: string,
  sort?: string,
): Promise<{ logs: LogsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (Number(page) - 1) * Number(limit);
  const rangeTo = Number(rangeFrom) + Number(limit) - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('logs')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    query = query.or(`user_id.eq.${search}`);
  }

  if (filterLogLevel) {
    query = query.or(`log_level.eq.${filterLogLevel}`);
  }

  if (filterEventName) {
    query = query.or(`event_name.eq.${filterEventName}`);
  }

  if (filter_source) {
    query = query.or(`source.eq.${filter_source}`);
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_LOGS_FAILED', error.message);

    return { logs: [], totalCount: 0 };
  }

  const parsed = z.array(LogsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_LOGS_INVALID_DATA', 'Fetch logs failed schema validation');

    return { logs: [], totalCount: 0 };
  }

  return { logs: parsed.data, totalCount: count ?? 0 };
}
