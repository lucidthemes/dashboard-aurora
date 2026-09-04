'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorUpdatePageSchema } from '../../schemas/actions/page/update-page.schema';
import type { EditorUpdatePage } from '../../schemas/actions/page/update-page.schema';
import { sanitizeContentBlocks } from '../../utils/block-sanitize';

export async function updatePage({
  editorData,
}: {
  editorData: EditorUpdatePage;
}): Promise<{ success: boolean; errors?: string[] }> {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_PAGE_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const editorDataParsed = EditorUpdatePageSchema.safeParse(editorData);

  if (!editorDataParsed.success) {
    await createLogEvent('error', 'UPDATE_PAGE_INVALID_DATA', 'Update page failed schema validation', user?.id);

    return { success: false };
  }

  const sanitizedBlocks = sanitizeContentBlocks({ blocks: editorData.content });

  const supabase = await createClient();

  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .update({
      title: editorData.title,
      slug: editorData.slug,
      content: sanitizedBlocks,
      status: editorData.status,
      options: editorData.options,
    })
    .eq('id', editorData.id)
    .select()
    .single();

  if (!pageData || pageError) {
    const errorMessage = pageError?.message ?? 'Update page failed';

    await createLogEvent('error', 'UPDATE_PAGE_FAILED', errorMessage, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'UPDATE_PAGE_SUCCESSFUL', 'Page created. Id: ' + pageData.id, user.id);

  return { success: true };
}
