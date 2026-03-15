import { Tabs } from '@/components/ui/tabs';

import CustomersViewSheetTabsList from './tabs/list';
import CustomersViewSheetTabDetails from './tabs/details';
import CustomersViewSheetTabOrders from './tabs/orders';
import CustomersViewSheetTabReviews from './tabs/reviews';
import CustomersViewSheetTabLogs from './tabs/logs';

export default function CustomersViewSheetContent() {
  return (
    <Tabs defaultValue="details" className="flex flex-col gap-y-5">
      <CustomersViewSheetTabsList />
      <CustomersViewSheetTabDetails />
      <CustomersViewSheetTabOrders />
      <CustomersViewSheetTabReviews />
      <CustomersViewSheetTabLogs />
    </Tabs>
  );
}
