import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsCreated() {
  const { viewSheetCustomer } = useCustomersStore();

  const createdDate = viewSheetCustomer?.created_at ? dateTimeFormat(viewSheetCustomer.created_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Created</h3>
      {createdDate ? <p className="text-sm">{createdDate}</p> : <p>--</p>}
    </div>
  );
}
