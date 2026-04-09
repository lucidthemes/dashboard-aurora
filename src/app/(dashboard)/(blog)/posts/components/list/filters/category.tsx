import ListFilter from '@/components/list/filters';

import getPostsListFilterCategories from '../../../data/filters/get-categories';

export default async function PostsListFilterCategory() {
  const categories = await getPostsListFilterCategories();

  if (!categories || categories.length === 0) return null;

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    value: category.slug,
    label: category.name,
  }));

  const filterOptions = [
    {
      id: 1,
      section: 'Category',
      items: formattedCategories,
    },
  ];

  return <ListFilter type={'category'} label={'Category'} options={filterOptions} />;
}
