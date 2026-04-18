import { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import Editor from '@/components/editor';
import EditorLoadingSpinner from '@/components/editor/components/loading';

import PostContent from './content';

export const metadata: Metadata = {
  title: 'Post',
  description: 'Create/edit blog post',
};

export default async function PostPage({
  searchParams,
}: {
  searchParams: Promise<{
    action: 'create' | 'edit';
    id?: string;
  }>;
}) {
  const { action = '', id = '' } = await searchParams;

  if (!action || !['create', 'edit'].includes(action) || (action === 'edit' && !id)) {
    redirect('/posts');
  }

  return (
    <>
      {action === 'create' ? (
        <Editor type="post" action="create" />
      ) : (
        <Suspense fallback={<EditorLoadingSpinner />}>
          <PostContent postId={id} />
        </Suspense>
      )}
    </>
  );
}
