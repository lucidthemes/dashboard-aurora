import type { Address } from '@/schemas/customer.schema';

export default function CustomersViewSheetTabDetailsAddress({
  type,
  address,
}: {
  type: 'shipping' | 'billing';
  address: Address | undefined | null;
}) {
  let country = '';

  if (address?.country) {
    switch (address.country) {
      case 'GB':
        country = 'United Kingdom';
        break;
    }
  }

  return (
    <div className="flex w-1/2 flex-col gap-2">
      <h3 className="flex gap-1 text-sm font-medium">
        <span className="capitalize">{type}</span>
        <span>address</span>
      </h3>
      {address ? (
        <address className="text-sm text-muted-foreground not-italic">
          <div className="flex gap-1.5">
            {address.firstName && <p>{address.firstName}</p>}
            {address.lastName && <p>{address.lastName}</p>}
          </div>
          {address.addressLine1 && <p>{address.addressLine1}</p>}
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          {address.city && <p>{address.city}</p>}
          {address.county && <p>{address.county}</p>}
          {address.postcode && <p>{address.postcode}</p>}
          {country && <p>{country}</p>}
          {address.phone && <p>{address.phone}</p>}
        </address>
      ) : (
        <span className="text-muted-foreground">--</span>
      )}
    </div>
  );
}
