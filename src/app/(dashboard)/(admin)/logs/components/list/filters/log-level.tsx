import ListFilter from '@/components/list/filters';

export default function LogsListFiltersLogLevel() {
  const filterOptions = [
    {
      id: 1,
      section: 'Log level',
      items: [
        {
          id: 1,
          value: 'info',
          label: 'Info',
        },
        {
          id: 2,
          value: 'warning',
          label: 'Warning',
        },
        {
          id: 3,
          value: 'error',
          label: 'Error',
        },
        {
          id: 4,
          value: 'critical',
          label: 'Critical',
        },
      ],
    },
  ];

  return <ListFilter type={'log_level'} label={'Log level'} options={filterOptions} />;
}
