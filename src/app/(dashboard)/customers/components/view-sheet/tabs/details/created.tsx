import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsCreated() {
  const { viewSheetCustomer } = useCustomersStore();

  const createdDate = viewSheetCustomer?.created_at ? dateTimeFormat(viewSheetCustomer.created_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Created</h3>
      {createdDate ? (
        <span className="text-sm text-muted-foreground">{createdDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
