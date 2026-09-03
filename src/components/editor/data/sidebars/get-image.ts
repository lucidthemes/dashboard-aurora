'use server';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorSidebarSettingsImageSchema } from '../../schemas/sidebars/settings-image.schema';
import type { EditorSidebarSettingsImage } from '../../schemas/sidebars/settings-image.schema';

export default async function getEditorSidebarSettingsImage(
  mediaId: string,
): Promise<EditorSidebarSettingsImage | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('media').select('storage_path, alt_text').eq('id', mediaId).maybeSingle();

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_SIDEBAR_SETTINGS_IMAGE_FAILED', error.message);

    return null;
  }

  const parsed = EditorSidebarSettingsImageSchema.safeParse(data);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_EDITOR_SIDEBAR_SETTINGS_IMAGE_INVALID_DATA',
      'Fetch editor sidebar settings image failed schema validation',
    );

    return null;
  }

  return parsed.data;
}
