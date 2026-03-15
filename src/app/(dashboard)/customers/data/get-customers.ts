'use server';

import { z } from 'zod';

import { createAdminClient } from '@/lib/supabase/admin';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { CustomersList } from '../schemas/customers-list.schema';
import { CustomersListSchema } from '../schemas/customers-list.schema';

export default async function getCustomers(
  page: number,
  limit: number,
  search?: string,
): Promise<{ customers: CustomersList[]; totalCount: number }> {
  const supabase = createAdminClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  let query = supabase
    .from('customers_list')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: false });

  if (search) {
    const isUUID = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

    if (isUUID(search)) {
      query = query.or(`id.eq.${search}`);
    } else {
      query = query.or(`email.eq.${search}`);
    }
  }

  const { data, count, error } = await query;

  if (error) {
    createLogEvent('error', 'FETCH_CUSTOMERS_FAILED', error.message);

    return { customers: [], totalCount: 0 };
  }

  const parsed = z.array(CustomersListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    createLogEvent('error', 'FETCH_CUSTOMERS_INVALID_DATA', 'Fetch customers failed schema validation');

    return { customers: [], totalCount: 0 };
  }

  return { customers: parsed.data, totalCount: count ?? 0 };
}
