import { dateTimeFormat } from '@/lib/formatters';

import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsUpdated() {
  const { viewSheetCustomer } = useCustomersStore();

  const updatedDate = viewSheetCustomer?.updated_at ? dateTimeFormat(viewSheetCustomer.updated_at) : null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Last updated</h3>
      {updatedDate ? <p className="text-sm">{updatedDate}</p> : <p>--</p>}
    </div>
  );
}
