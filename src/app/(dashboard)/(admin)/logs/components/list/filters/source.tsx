import ListFilter from '@/components/list/filters';

export default function LogsListFiltersLogSource() {
  const filterOptions = [
    {
      id: 1,
      section: 'Source',
      items: [
        {
          id: 1,
          value: 'frontend',
          label: 'Frontend',
        },
        {
          id: 2,
          value: 'dashboard',
          label: 'Dashboard',
        },
      ],
    },
  ];

  return <ListFilter type={'source'} label={'Source'} options={filterOptions} />;
}
