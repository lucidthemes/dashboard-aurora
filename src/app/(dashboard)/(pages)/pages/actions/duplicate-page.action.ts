'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { PagesDuplicatePageActionSchema } from '../schemas/actions/duplicate-page.schema';

type FetchPageType = {
  id: string;
  title: string;
  slug: string;
};

export default async function duplicatePage(pageId: string) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'DUPLICATE_PAGE_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  if (!pageId) {
    await createLogEvent('error', 'DUPLICATE_PAGE_NO_PAGE_ID', 'Page id not passed through', user.id);

    return { success: false };
  }

  const parsed = PagesDuplicatePageActionSchema.safeParse(pageId);

  if (!parsed.success) {
    await createLogEvent('error', 'DUPLICATE_PAGE_INVALID_DATA', 'Duplicate page failed schema validation', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { data: page, error: fetchError } = await supabase
    .from('pages')
    .select('*')
    .eq('id', pageId)
    .single<FetchPageType>();

  if (fetchError) {
    await createLogEvent('error', 'DUPLICATE_PAGE_FETCH_FAILED', fetchError.message + '. Page id: ' + pageId, user.id);

    return { success: false };
  }

  if (!page) {
    await createLogEvent('error', 'DUPLICATE_PAGE_NOT_FOUND', 'Page not found. Id: ' + pageId, user.id);

    return { success: false };
  }

  const { id, ...rest } = page;

  const duplicatedPage = {
    ...rest,
    title: `${page.title} - copy`,
    slug: `${page.slug}-copy`,
    status: 'draft',
    created_at: new Date().toISOString(),
  };

  const { error: insertError } = await supabase.from('pages').insert(duplicatedPage);

  if (insertError) {
    await createLogEvent(
      'error',
      'DUPLICATE_PAGE_INSERT_FAILED',
      insertError.message + '. Page id: ' + pageId,
      user.id,
    );

    return { success: false };
  }

  revalidatePath('/pages');

  return { success: true };
}
