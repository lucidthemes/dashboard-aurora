import ListFilters from '@/components/list/filters/filters';

import LogsListFiltersLogLevel from './log-level';
import LogsListFiltersEventName from './event-name';
import LogsListFiltersLogSource from './source';

export default function LogsListFilters() {
  return (
    <ListFilters>
      <LogsListFiltersLogLevel />
      <LogsListFiltersEventName />
      <LogsListFiltersLogSource />
    </ListFilters>
  );
}
