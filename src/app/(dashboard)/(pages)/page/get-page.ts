'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { PageSchema } from '@/schemas/page/page.schema';
import type { Page } from '@/schemas/page/page.schema';
import { ContentBlocksSchema } from '@/components/editor/schemas/content/content-blocks.schema';

export default async function getPage(pageId: string): Promise<Page | null> {
  if (!pageId) return null;

  const supabase = await createClient();

  const query = supabase
    .from('pages')
    .select('id, title, slug, content, status, created_at, updated_at, options')
    .eq('id', pageId)
    .maybeSingle();

  const { data, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_PAGE_FAILED', error.message);

    return null;
  }

  if (!data) {
    await createLogEvent('error', 'FETCH_PAGE_NOT_FOUND', 'Page not found. Id: ' + pageId);

    return null;
  }

  const pageData: Page = {
    ...data,
    content: [],
  };

  const parsedPage = PageSchema.safeParse(pageData);

  if (!parsedPage.success) {
    await createLogEvent('error', 'FETCH_PAGE_INVALID_DATA', 'Fetch page failed schema validation');

    return null;
  }

  const pageContent = data.content;
  const parsedContent = z.array(ContentBlocksSchema).safeParse(pageContent ?? []);

  // parse content separate to page so that if an attribute has changed for a block and that isn't saved in DB,
  // it doesn't cause the whole page to fail schema validation and redirect back to pages page
  if (!parsedContent.success) {
    await createLogEvent('error', 'FETCH_PAGE_CONTENT_INVALID_DATA', 'Fetch page content failed schema validation');
  }

  // create new return object using normalized data that has passed schema validation
  // and add in the page content
  const returnPageData = {
    ...pageData,
    content: pageContent,
  };

  return returnPageData;
}
