'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { dateTimeFormat } from '@/lib/formatters';

import type { PostsList } from '../../schemas/posts-list.schema';
import PostsListColumnActionsButtons from './actions-buttons';

export default function PostsListColumns() {
  const columns: ColumnDef<PostsList>[] = [];

  columns.push({
    accessorKey: 'title',
    header: 'Title',
  });

  columns.push({
    accessorKey: 'author_id',
    header: 'Author',
    cell: ({ row }) => {
      const item = row.original;

      if (!item.author) return;

      return item.author.name;
    },
  });

  columns.push({
    accessorKey: 'posts_categories',
    header: 'Categories',
    cell: ({ row }) => {
      const item = row.original;
      const formattedCategories = item.categories.map((itemCategory) => itemCategory.category);

      if (!formattedCategories) return;

      const categoriesLength = formattedCategories.length;

      return (
        <ul className="flex flex-wrap gap-1">
          {formattedCategories.map((category, index) => (
            <li key={category.id}>
              {category.name}
              {index < categoriesLength - 1 && ', '}
            </li>
          ))}
        </ul>
      );
    },
  });

  columns.push({
    accessorKey: 'posts_tags',
    header: 'Tags',
    cell: ({ row }) => {
      const item = row.original;
      const formattedTags = item.tags.map((itemTag) => itemTag.tag);

      if (!formattedTags) return;

      const tagsLength = formattedTags.length;

      return (
        <ul className="flex flex-wrap gap-1">
          {formattedTags.map((tag, index) => (
            <li key={tag.id}>
              {tag.name}
              {index < tagsLength - 1 && ', '}
            </li>
          ))}
        </ul>
      );
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
    accessorKey: 'updated_at',
    header: 'Updated',
    cell: ({ row }) => {
      const item = row.original;

      return dateTimeFormat(item.updated_at);
    },
  });

  columns.push({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-end gap-x-2.5">
          <PostsListColumnActionsButtons item={item} />
        </div>
      );
    },
  });

  return columns;
}
