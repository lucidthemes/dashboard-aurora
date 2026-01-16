import type { Metadata } from 'next';

import DashboardLayout from './(dashboard)/layout';
import DashboardPage from './(dashboard)/page';

export const metadata: Metadata = {
  title: 'Dashboard - Aurora',
  description: 'Aurora dashboard',
};

export default function Page() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
