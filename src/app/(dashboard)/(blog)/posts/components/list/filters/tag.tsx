import ListFilter from '@/components/list/filters';

import getPostsListFilterTags from '../../../data/filters/get-tags';

export default async function PostsListFilterTag() {
  const tags = await getPostsListFilterTags();

  if (!tags || tags.length === 0) return null;

  const formattedtags = tags.map((tag) => ({
    id: tag.id,
    value: tag.slug,
    label: tag.name,
  }));

  const filterOptions = [
    {
      id: 1,
      section: 'Tag',
      items: formattedtags,
    },
  ];

  return <ListFilter type={'tag'} label={'Tag'} options={filterOptions} />;
}
