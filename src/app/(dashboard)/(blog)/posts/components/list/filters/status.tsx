import ListFilter from '@/components/list/filters';

export default function PostsListFilterStatus() {
  const filterOptions = [
    {
      id: 1,
      section: 'Status',
      items: [
        {
          id: 1,
          value: 'draft',
          label: 'Draft',
        },
        {
          id: 2,
          value: 'published',
          label: 'Published',
        },
      ],
    },
  ];

  return <ListFilter type={'status'} label={'Status'} options={filterOptions} />;
}
