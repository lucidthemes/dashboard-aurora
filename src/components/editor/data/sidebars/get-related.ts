'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorSidebarSettingsRelatedSchema } from '../../schemas/sidebars/settings-related.schema';
import type { EditorSidebarSettingsRelated } from '../../schemas/sidebars/settings-related.schema';

export default async function getEditorSidebarSettingsRelated(
  postId?: string | null,
): Promise<EditorSidebarSettingsRelated[] | null> {
  const supabase = await createClient();

  let query = supabase.from('posts').select('id, title').eq('status', 'published');

  // dont show current post being edited within list of related posts
  if (postId) query = query.not('id', 'in', postId);

  const { data, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_SIDEBAR_SETTINGS_RELATED_FAILED', error.message);

    return null;
  }

  const parsed = z.array(EditorSidebarSettingsRelatedSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_EDITOR_SIDEBAR_SETTINGS_RELATED__INVALID_DATA',
      'Fetch editor sidebar settings related failed schema validation',
    );

    return null;
  }

  return parsed.data;
}
