import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsEmail() {
  const { viewSheetCustomer } = useCustomersStore();

  if (!viewSheetCustomer?.email) return null;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-medium">Email address</h3>
      <p>{viewSheetCustomer?.email}</p>
    </div>
  );
}
