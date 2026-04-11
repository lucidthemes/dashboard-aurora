import ListFilter from '@/components/list/filters';

export default function PostsCommentsListFilterStatus() {
  const filterOptions = [
    {
      id: 1,
      section: 'Status',
      items: [
        {
          id: 1,
          value: 'approved',
          label: 'Approved',
        },
        {
          id: 2,
          value: 'pending',
          label: 'Pending',
        },
        {
          id: 3,
          value: 'rejected',
          label: 'Rejected',
        },
      ],
    },
  ];

  return <ListFilter type={'status'} label={'Status'} options={filterOptions} />;
}
