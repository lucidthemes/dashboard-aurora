'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { PostsCommentsList } from '../schemas/comments-list.schema';
import PostsCommentsListColumnActionsButtons from './actions-buttons';

export default function PostsCommentsListColumns() {
  const columns: ColumnDef<PostsCommentsList>[] = [];

  columns.push({
    accessorKey: 'post',
    header: 'Post',
    cell: ({ row }) => {
      const item = row.original;

      return item.post.name;
    },
  });

  columns.push({
    accessorKey: 'name',
    header: 'Name',
  });

  columns.push({
    accessorKey: 'comment',
    header: 'Comment',
  });

  columns.push({
    accessorKey: 'reply_to',
    header: 'Reply',
    cell: ({ row }) => {
      const item = row.original;

      return item.reply_to === null ? 'No' : 'Yes';
    },
  });

  columns.push({
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original;

      return <span className="capitalize">{item.status}</span>;
    },
  });

  columns.push({
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.created_at);
    },
  });

  columns.push({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <PostsCommentsListColumnActionsButtons item={item} />
        </div>
      );
    },
  });

  return columns;
}
