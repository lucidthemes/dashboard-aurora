import { z } from 'zod';

import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { CustomerViewSheetOrders } from '../../schemas/view-sheet/orders.schema';
import { CustomerViewSheetOrdersSchema } from '../../schemas/view-sheet/orders.schema';

export default async function getCustomerViewSheetOrders(customerId: string): Promise<CustomerViewSheetOrders[]> {
  if (!customerId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .select('order_id, total, created_at')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) {
    createLogEvent('error', 'FETCH_CUSTOMER_ORDERS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(CustomerViewSheetOrdersSchema).safeParse(data ?? []);

  if (!parsed.success) {
    createLogEvent('error', 'FETCH_CUSTOMER_ORDERS_INVALID_DATA', 'Fetch customer orders failed schema validation');

    return [];
  }

  return data;
}
