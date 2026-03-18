import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/components/dashboard/main-container';
import { LoadingSpinner } from '@/components/loading';

import LogsPageHeading from './components/page/heading';
import LogsList from './components/list';

export const metadata: Metadata = {
  title: 'Logs',
  description: 'View frontend and dashboard logs',
};

export default async function LogsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    search?: string;
    filter_log_level?: string;
    filter_event_name?: string;
    filter_source?: string;
    sort?: string;
  }>;
}) {
  const {
    page = 1,
    limit = 50,
    search = '',
    filter_log_level = '',
    filter_event_name = '',
    filter_source = '',
    sort = '',
  } = await searchParams;

  return (
    <MainContainer>
      <LogsPageHeading />
      <Suspense key="logs" fallback={<LoadingSpinner />}>
        <LogsList
          page={page}
          limit={limit}
          search={search}
          filterLogLevel={filter_log_level}
          filterEventName={filter_event_name}
          filterSource={filter_source}
          sort={sort}
        />
      </Suspense>
    </MainContainer>
  );
}
