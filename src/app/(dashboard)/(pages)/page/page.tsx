import { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import Editor from '@/components/editor';
import EditorLoadingSpinner from '@/components/editor/components/loading';

import PageContent from './content';

export const metadata: Metadata = {
  title: 'Page',
  description: 'Create/edit page',
};

export default async function PagePage({
  searchParams,
}: {
  searchParams: Promise<{
    action: 'create' | 'edit';
    id?: string;
  }>;
}) {
  const { action = '', id = '' } = await searchParams;

  if (!action || !['create', 'edit'].includes(action) || (action === 'edit' && !id)) {
    redirect('/pages');
  }

  return (
    <>
      {action === 'create' ? (
        <Editor type="page" action="create" />
      ) : (
        <Suspense fallback={<EditorLoadingSpinner />}>
          <PageContent pageId={id} />
        </Suspense>
      )}
    </>
  );
}
