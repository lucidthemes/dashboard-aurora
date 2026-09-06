import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { SidebarsListSchema } from '../schemas/list.schema';
import type { SidebarsList } from '../schemas/list.schema';

export async function getSidebars(): Promise<SidebarsList[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('sidebars').select().order('created_at', { ascending: false });

  if (error) {
    await createLogEvent('error', 'FETCH_SIDEBARS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(SidebarsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_SIDEBARS_INVALID_DATA', 'Fetch sidebars failed schema validation');

    return [];
  }

  return parsed.data;
}
