'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { EditorCreatePageSchema } from '../../schemas/actions/page/create-page.schema';
import type { EditorCreatePage } from '../../schemas/actions/page/create-page.schema';
import { sanitizeContentBlocks } from '../../utils/block-sanitize';

export async function createPage({
  editorData,
}: {
  editorData: EditorCreatePage;
}): Promise<{ success: boolean; errors?: string[] }> {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_PAGE_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const editorDataParsed = EditorCreatePageSchema.safeParse(editorData);

  if (!editorDataParsed.success) {
    await createLogEvent('error', 'CREATE_PAGE_INVALID_DATA', 'Create page failed schema validation', user?.id);

    return { success: false };
  }

  const sanitizedBlocks = sanitizeContentBlocks({ blocks: editorData.content });

  const supabase = await createClient();

  const { data: pageData, error: pageError } = await supabase
    .from('pages')
    .insert({
      title: editorData.title,
      slug: editorData.slug,
      content: sanitizedBlocks,
      status: editorData.status,
      options: editorData.options,
    })
    .select()
    .single();

  if (!pageData || pageError) {
    const errorMessage = pageError?.message ?? 'Create page failed';

    await createLogEvent('error', 'CREATE_PAGE_FAILED', errorMessage, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_PAGE_SUCCESSFUL', 'Page created. Id: ' + pageData.id, user.id);

  return { success: true };
}
