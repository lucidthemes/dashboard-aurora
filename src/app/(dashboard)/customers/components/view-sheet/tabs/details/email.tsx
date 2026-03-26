import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsEmail() {
  const { viewSheetCustomer } = useCustomersStore();

  if (!viewSheetCustomer?.email) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Email address</h3>
      <p className="text-sm">{viewSheetCustomer?.email}</p>
    </div>
  );
}
