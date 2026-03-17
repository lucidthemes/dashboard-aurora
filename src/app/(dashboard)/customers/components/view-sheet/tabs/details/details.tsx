import { TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import CustomersViewSheetTabDetailsName from './name';
import CustomersViewSheetTabDetailsEmail from './email';
import CustomersViewSheetTabDetailsAddresses from './addresses';
import CustomersViewSheetTabDetailsCreated from './created';
import CustomersViewSheetTabDetailsUpdated from './updated';

export default function CustomersViewSheetTabDetails() {
  return (
    <TabsContent value="details" className="flex flex-col gap-5">
      <CustomersViewSheetTabDetailsName />
      <Separator />
      <CustomersViewSheetTabDetailsEmail />
      <Separator />
      <CustomersViewSheetTabDetailsAddresses />
      <Separator />
      <CustomersViewSheetTabDetailsCreated />
      <Separator />
      <CustomersViewSheetTabDetailsUpdated />
      <Separator />
    </TabsContent>
  );
}
