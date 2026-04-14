'use server';

import { z } from 'zod';

import { createAdminClient } from '@/lib/supabase/admin';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { UsersList } from '../schemas/users-list.schema';
import { UsersListSchema } from '../schemas/users-list.schema';

export default async function getUsers(
  page: number,
  limit: number,
  search?: string,
  filterRole?: string,
  sort?: string,
): Promise<{ users: UsersList[]; totalCount: number }> {
  const supabase = createAdminClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('users_list')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    const isUUID = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

    if (isUUID(search)) {
      query = query.eq('id', search);
    } else {
      query = query.ilike('email', `%${search}%`);
    }
  }

  if (filterRole) {
    query = query.eq('role', filterRole);
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_USERS_FAILED', error.message);

    return { users: [], totalCount: 0 };
  }

  const parsed = z.array(UsersListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_USERS_INVALID_DATA', 'Fetch users failed schema validation');

    return { users: [], totalCount: 0 };
  }

  return { users: parsed.data, totalCount: count ?? 0 };
}
