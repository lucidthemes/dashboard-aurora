'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorSidebarSettingsAuthorsSchema } from '../../schemas/sidebars/settings-authors.schema';
import type { EditorSidebarSettingsAuthors } from '../../schemas/sidebars/settings-authors.schema';

export default async function getEditorSidebarSettingsAuthors(): Promise<EditorSidebarSettingsAuthors[] | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('post_authors').select('id, name');

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_SIDEBAR_SETTINGS_AUTHORS_FAILED', error.message);

    return null;
  }

  const parsed = z.array(EditorSidebarSettingsAuthorsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_EDITOR_SIDEBAR_SETTINGS_AUTHORS_INVALID_DATA',
      'Fetch editor sidebar settings authors failed schema validation',
    );

    return null;
  }

  return parsed.data;
}
