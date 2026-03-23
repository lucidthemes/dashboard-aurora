import { TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import UsersViewSheetTabDetailsEmail from './email';
import UsersViewSheetTabDetailsEmailConfirmed from './email-confirmed';
import UsersViewSheetTabDetailsEmailChange from './email-change';
import UsersViewSheetTabDetailsEmailChangeSent from './email-change-sent';
import UsersViewSheetTabDetailsRecoverySent from './recovery-sent';
import UsersViewSheetTabDetailsCreated from './created';
import UsersViewSheetTabDetailsUpdated from './updated';
import UsersViewSheetTabDetailsLastSignIn from './last-sign-in';
import UsersViewSheetTabDetailsRole from './role';

export default function UsersViewSheetTabDetails() {
  return (
    <TabsContent value="details" className="flex flex-col gap-5">
      <UsersViewSheetTabDetailsEmail />
      <Separator />
      <UsersViewSheetTabDetailsEmailConfirmed />
      <Separator />
      <UsersViewSheetTabDetailsEmailChange />
      <Separator />
      <UsersViewSheetTabDetailsEmailChangeSent />
      <Separator />
      <UsersViewSheetTabDetailsRecoverySent />
      <Separator />
      <UsersViewSheetTabDetailsCreated />
      <Separator />
      <UsersViewSheetTabDetailsUpdated />
      <Separator />
      <UsersViewSheetTabDetailsLastSignIn />
      <Separator />
      <UsersViewSheetTabDetailsRole />
      <Separator />
    </TabsContent>
  );
}
