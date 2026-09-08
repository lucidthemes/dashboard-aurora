import type { SidebarsFormWidgetPosts } from '../../../../schemas/form/widgets/posts.schema';

export const SidebarsFormWidgetPostsCreate = (): SidebarsFormWidgetPosts => ({
  id: crypto.randomUUID(),
  type: 'posts',
  title: 'Latest posts',
  limit: 3,
  style: 'small',
  location: 'sidebar',
});
