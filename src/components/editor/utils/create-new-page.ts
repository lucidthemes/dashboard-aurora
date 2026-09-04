import type { NewPage } from '../schemas/new-page.schema';

export function createNewPage(): NewPage {
  return {
    id: null,
    title: '',
    slug: '',
    content: [],
    status: 'draft',
    created_at: null,
    updated_at: null,
    options: {
      sidebar: { show: true },
    },
  };
}
