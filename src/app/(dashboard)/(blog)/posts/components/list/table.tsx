'use client';

import { DataTable } from '@/components/ui/data-table';

import type { PostsList } from '../../schemas/posts-list.schema';
import PostsListColumns from './columns';

export default function PostsListTable({ postsList }: { postsList: PostsList[] }) {
  const postsListColumns = PostsListColumns();

  return <DataTable columns={postsListColumns} data={postsList} />;
}
