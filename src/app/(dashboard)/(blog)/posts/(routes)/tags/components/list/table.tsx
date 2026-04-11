'use client';

import { DataTable } from '@/components/ui/data-table';

import type { PostsTagsList } from '../../schemas/tags-list.schema';
import PostsTagsListColumns from './columns';

export default function PostsTagsListTable({ tagsList }: { tagsList: PostsTagsList[] }) {
  const postsTagsListColumns = PostsTagsListColumns();

  return <DataTable columns={postsTagsListColumns} data={tagsList} />;
}
