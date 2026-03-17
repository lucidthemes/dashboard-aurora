import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsUpdated() {
  const { viewSheetCustomer } = useCustomersStore();

  if (!viewSheetCustomer?.updated_at) return null;

  const updatedDate = dateTimeFormat(viewSheetCustomer.updated_at);

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-medium">Last updated</h3>
      <p>{updatedDate}</p>
    </div>
  );
}
