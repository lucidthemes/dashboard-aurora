import ListFilter from '@/components/list/filters';

export default function UsersListFiltersRole() {
  const filterOptions = [
    {
      id: 1,
      section: 'Role',
      items: [
        {
          id: 1,
          value: 'customer',
          label: 'Customer',
        },
        {
          id: 2,
          value: 'editor',
          label: 'Editor',
        },
        {
          id: 3,
          value: 'admin',
          label: 'Admin',
        },
      ],
    },
  ];

  return <ListFilter type={'role'} label={'Role'} options={filterOptions} />;
}
