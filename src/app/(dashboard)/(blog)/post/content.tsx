import { redirect } from 'next/navigation';

import Editor from '@/components/editor';

import getPost from './get-post';

export default async function PostContent({ postId }: { postId: string }) {
  const post = await getPost(postId);

  if (!post) redirect('/posts');

  return <Editor type="post" action="edit" post={post} />;
}
