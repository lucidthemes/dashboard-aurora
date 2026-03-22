import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import { InstagramFeedFormMediaSchema } from '../schemas/form.schema';
import type { InstagramFeedFormMedia } from '../schemas/form.schema';

export async function getInstagramFeedFormMedia(page: number): Promise<InstagramFeedFormMedia | undefined> {
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
    .eq('type', 'image')
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: false });

  if (error) {
    createLogEvent('error', 'FETCH_INSTAGRAM_FEED_FORM_MEDIA_FAILED', error.message);

    return undefined;
  }

  const hasMore = count && count > page * limit ? true : false;

  const formMediaData: InstagramFeedFormMedia = {
    items: mediaData,
    hasMore: hasMore,
  };

  const parsed = InstagramFeedFormMediaSchema.safeParse(formMediaData);

  if (!parsed.success) {
    createLogEvent(
      'error',
      'FETCH_INSTAGRAM_FEED_FORM_MEDIA_INVALID_DATA',
      'Fetch instagram feed form media failed schema validation',
    );

    return undefined;
  }

  return parsed.data;
}
