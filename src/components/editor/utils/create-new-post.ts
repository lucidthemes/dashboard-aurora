import type { NewPost } from '../schemas/new-post.schema';

export function createNewPost(): NewPost {
  return {
    id: null,
    title: '',
    slug: '',
    author_id: '',
    media_id: '',
    excerpt: '',
    categories: [],
    tags: [],
    related: [],
    content: [],
    status: 'draft',
    created_at: null,
    updated_at: null,
    options: {
      header: { show: true },
      sidebar: { show: true },
    },
  };
}
