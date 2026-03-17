import { useCustomersStore } from '../../../../store/customers.store';

import CustomersViewSheetTabDetailsAddress from './address';

export default function CustomersViewSheetTabDetailsAddresses() {
  const { viewSheetCustomer } = useCustomersStore();

  const shippingAddress = viewSheetCustomer?.shipping_address;
  const billingAddress = viewSheetCustomer?.billing_address;

  return (
    <div className="flex flex-row">
      <CustomersViewSheetTabDetailsAddress type="shipping" address={shippingAddress} />
      <CustomersViewSheetTabDetailsAddress type="billing" address={billingAddress} />
    </div>
  );
}
