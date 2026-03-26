'use client';

import SheetContent from '@/components/sheets/content';

import { useCustomersStore } from '../../store/customers.store';
import CustomersViewSheetContent from '../view-sheet';

export default function CustomersPageWrapper({ children }: { children: React.ReactNode }) {
  const { viewSheetOpen, setViewSheetOpen, viewSheetCustomer } = useCustomersStore();

  const viewSheetClose = () => {
    setViewSheetOpen(false);
  };

  return (
    <>
      {children}

      {/* View customer sheet */}
      <SheetContent
        sheetOpen={viewSheetOpen}
        sheetClose={viewSheetClose}
        title={`Customer ID: ${viewSheetCustomer?.id}`}
        description="View customer details"
        size="large"
      >
        <CustomersViewSheetContent />
      </SheetContent>
    </>
  );
}
