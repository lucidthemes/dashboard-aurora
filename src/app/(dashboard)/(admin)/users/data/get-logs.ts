import { z } from 'zod';

import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { UsersViewSheetLogs } from '../schemas/sheets/logs.schema';
import { UsersViewSheetLogsSchema } from '../schemas/sheets/logs.schema';

export default async function getUsersViewSheetLogs(userId: string): Promise<UsersViewSheetLogs[]> {
  if (!userId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from('logs')
    .select('log_level, message, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    await createLogEvent('error', 'FETCH_USER_LOGS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(UsersViewSheetLogsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_USER_LOGS_INVALID_DATA', 'Fetch user logs failed schema validation');

    return [];
  }

  return data;
}
