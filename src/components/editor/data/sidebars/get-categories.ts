'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorSidebarSettingsCategoriesSchema } from '../../schemas/sidebars/settings-categories.schema';
import type { EditorSidebarSettingsCategories } from '../../schemas/sidebars/settings-categories.schema';

export default async function getEditorSidebarSettingsCategories(): Promise<EditorSidebarSettingsCategories[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('post_categories').select('id, name');

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_SIDEBAR_SETTINGS_CATEGORIES_FAILED', error.message);

    return null;
  }

  const parsed = z.array(EditorSidebarSettingsCategoriesSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_EDITOR_SIDEBAR_SETTINGS_CATEGORIES_INVALID_DATA',
      'Fetch editor sidebar settings categories failed schema validation',
    );

    return null;
  }

  return parsed.data;
}
