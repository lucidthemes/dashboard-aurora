import { redirect } from 'next/navigation';

import Editor from '@/components/editor';

import getPage from './get-page';

export default async function PageContent({ pageId }: { pageId: string }) {
  const page = await getPage(pageId);

  if (!page) redirect('/pages');

  return <Editor type="page" action="edit" page={page} />;
}
