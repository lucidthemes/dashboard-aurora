'use client';

import { DataTable } from '@/components/ui/data-table';

import type { PostsAuthorsList } from '../../schemas/authors-list.schema';
import PostsAuthorsListColumns from './columns';

export default function PostsAuthorsListTable({ authorsList }: { authorsList: PostsAuthorsList[] }) {
  const postsAuthorsListColumns = PostsAuthorsListColumns();

  return <DataTable columns={postsAuthorsListColumns} data={authorsList} />;
}
