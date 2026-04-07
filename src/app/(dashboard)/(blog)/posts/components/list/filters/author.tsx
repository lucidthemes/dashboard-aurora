import ListFilter from '@/components/list/filters';

import getPostsListFilterAuthors from '../../../data/filters/get-authors';

export default async function PostsListFilterAuthor() {
  const authors = await getPostsListFilterAuthors();

  if (!authors || authors.length === 0) return null;

  const formattedAuthors = authors.map((author) => ({
    id: author.id,
    value: author.slug,
    label: author.name,
  }));

  const filterOptions = [
    {
      id: 1,
      section: 'Author',
      items: formattedAuthors,
    },
  ];

  return <ListFilter type={'author'} label={'Author'} options={filterOptions} />;
}
