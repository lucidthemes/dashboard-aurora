import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import { SidebarsFormWidgetMediaSchema } from '../schemas/form/media.schema';
import type { SidebarsFormWidgetMedia } from '../schemas/form/media.schema';

export async function getSidebarsFormWidgetMedia({
  page,
}: {
  page: number;
}): Promise<SidebarsFormWidgetMedia | undefined> {
  const supabase = createClient();

  const limit = 10;

  const rangeFrom = (Number(page) - 1) * Number(limit);
  const rangeTo = Number(rangeFrom) + Number(limit) - 1;

  const {
    data: mediaData,
    count,
    error,
  } = await supabase
    .from('media')
    .select('id, storage_path, alt_text', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .eq('type', 'image')
    .order('created_at', { ascending: false });

  if (error) {
    await createLogEvent('error', 'FETCH_SIDEBARS_FORM_WIDGET_MEDIA_FAILED', error.message);

    return undefined;
  }

  const hasMore = count && count > page * limit ? true : false;

  const formMediaData: SidebarsFormWidgetMedia = {
    items: mediaData,
    hasMore: hasMore,
  };

  const parsed = SidebarsFormWidgetMediaSchema.safeParse(formMediaData);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_SIDEBARS_FORM_WIDGET_MEDIA_INVALID_DATA',
      'Fetch sidebars form widget media failed schema validation',
    );

    return undefined;
  }

  return parsed.data;
}
