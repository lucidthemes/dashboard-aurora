import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsCreated() {
  const { viewSheetCustomer } = useCustomersStore();

  if (!viewSheetCustomer?.created_at) return null;

  const createdDate = dateTimeFormat(viewSheetCustomer.created_at);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Created</h3>
      <p className="text-sm">{createdDate}</p>
    </div>
  );
}
