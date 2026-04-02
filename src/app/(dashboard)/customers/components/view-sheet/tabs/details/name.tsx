import { useCustomersStore } from '../../../../store/customers.store';

export default function CustomersViewSheetTabDetailsName() {
  const { viewSheetCustomer } = useCustomersStore();

  const firstName = viewSheetCustomer?.first_name;
  const lastName = viewSheetCustomer?.last_name;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Name</h3>
      {firstName || lastName ? (
        <div className="flex gap-1">
          {firstName && <span className="text-sm text-muted-foreground">{firstName}</span>}
          {lastName && <span className="text-sm text-muted-foreground">{lastName}</span>}
        </div>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
