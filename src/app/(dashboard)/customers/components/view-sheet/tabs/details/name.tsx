import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsName() {
  const { viewSheetCustomer } = useCustomersStore();

  const firstName = viewSheetCustomer?.first_name;
  const lastName = viewSheetCustomer?.last_name;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-medium">Name</h3>
      {firstName || lastName ? (
        <div className="flex gap-1">
          {firstName && <span>{firstName}</span>}
          {lastName && <span>{lastName}</span>}
        </div>
      ) : (
        <p>--</p>
      )}
    </div>
  );
}
