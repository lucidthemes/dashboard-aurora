import { Metadata } from 'next';
import { Suspense } from 'react';

import MainContainer from '@/app/(dashboard)/components/container';
import { LoadingSpinner } from '@/components/loading';

import SidebarsPageHeading from './components/page/heading';
import SidebarsPageWrapper from './components/page/wrapper';
import SidebarsList from './components/list';

export const metadata: Metadata = {
  title: 'Sidebars',
  description: 'Create and edit sidebars',
};

export default function SidebarsPage() {
  return (
    <MainContainer>
      <SidebarsPageWrapper>
        <SidebarsPageHeading />
        <Suspense fallback={<LoadingSpinner />}>
          <SidebarsList />
        </Suspense>
      </SidebarsPageWrapper>
    </MainContainer>
  );
}
