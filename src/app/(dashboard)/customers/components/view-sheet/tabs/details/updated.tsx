import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsUpdated() {
  const { viewSheetCustomer } = useCustomersStore();

  const updatedDate = viewSheetCustomer?.updated_at ? dateTimeFormat(viewSheetCustomer.updated_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Last updated</h3>
      {updatedDate ? (
        <span className="text-sm text-muted-foreground">{updatedDate}</span>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
