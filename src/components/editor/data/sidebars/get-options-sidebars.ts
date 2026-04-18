'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorSidebarSettingsOptionsSidebarsSchema } from '../../schemas/sidebars/settings-options-sidebars.schema';
import type { EditorSidebarSettingsOptionsSidebars } from '../../schemas/sidebars/settings-options-sidebars.schema';

export default async function getEditorSidebarSettingsOptionsSidebars(): Promise<
  EditorSidebarSettingsOptionsSidebars[] | null
> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('sidebars').select('id, name, title');

  if (error) {
    await createLogEvent('error', 'FETCH_EDITOR_SIDEBAR_SETTINGS_OPTIONS_SIDEBARS_FAILED', error.message);

    return null;
  }

  const parsed = z.array(EditorSidebarSettingsOptionsSidebarsSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_EDITOR_SIDEBAR_SETTINGS_OPTIONS_SIDEBARS_INVALID_DATA',
      'Fetch editor sidebar settings options sidebars failed schema validation',
    );

    return null;
  }

  return parsed.data;
}
