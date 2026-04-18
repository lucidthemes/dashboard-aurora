'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorSidebarSettingsTagsSchema } from '../../schemas/sidebars/settings-tags.schema';
import type { EditorSidebarSettingsTags } from '../../schemas/sidebars/settings-tags.schema';

export default async function getEditorSidebarSettingsTags(): Promise<EditorSidebarSettingsTags[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('post_tags').select('id, name');

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_SIDEBAR_SETTINGS_TAGS_FAILED', error.message);

    return null;
  }

  const parsed = z.array(EditorSidebarSettingsTagsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_EDITOR_SIDEBAR_SETTINGS_TAGS_INVALID_DATA',
      'Fetch editor sidebar settings tags failed schema validation',
    );

    return null;
  }

  return parsed.data;
}
