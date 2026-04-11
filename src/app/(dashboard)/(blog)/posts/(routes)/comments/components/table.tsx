'use client';

import { DataTable } from '@/components/ui/data-table';

import type { PostsCommentsList } from '../schemas/comments-list.schema';
import PostsCommentsListColumns from './columns';

export default function PostsCommentsListTable({ commentsList }: { commentsList: PostsCommentsList[] }) {
  const postsCommentsListColumns = PostsCommentsListColumns();

  return <DataTable columns={postsCommentsListColumns} data={commentsList} />;
}
