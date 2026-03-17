import { z } from 'zod';

import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { CustomerViewSheetLogs } from '../../schemas/view-sheet/logs.schema';
import { CustomerViewSheetLogsSchema } from '../../schemas/view-sheet/logs.schema';

export default async function getCustomerViewSheetLogs(customerId: string): Promise<CustomerViewSheetLogs[]> {
  if (!customerId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from('logs')
    .select('log_level, message, created_at')
    .eq('user_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    createLogEvent('error', 'FETCH_CUSTOMER_LOGS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(CustomerViewSheetLogsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    createLogEvent('error', 'FETCH_CUSTOMER_LOGS_INVALID_DATA', 'Fetch customer logs failed schema validation');

    return [];
  }

  return data;
}
