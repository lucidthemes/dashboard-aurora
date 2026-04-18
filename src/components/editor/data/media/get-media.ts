import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorMediaSchema } from '../../schemas/media/media.schema';
import type { EditorMedia } from '../../schemas/media/media.schema';

export async function getEditorMedia({
  type,
  page,
}: {
  type: 'image' | 'video';
  page: number;
}): Promise<EditorMedia | undefined> {
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
    .eq('type', type)
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: false });

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_MEDIA_FAILED', error.message);

    return undefined;
  }

  const hasMore = count && count > page * limit ? true : false;

  const formMediaData: EditorMedia = {
    items: mediaData,
    hasMore: hasMore,
  };

  const parsed = EditorMediaSchema.safeParse(formMediaData);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_EDITOR_MEDIA_INVALID_DATA', 'Fetch editor media failed schema validation');

    return undefined;
  }

  return parsed.data;
}
