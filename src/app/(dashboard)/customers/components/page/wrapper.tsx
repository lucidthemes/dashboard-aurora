'use client';

import SheetContent from '@/components/sheets/content';

import CustomersViewSheetContent from '../view-sheet/content';
import { useCustomersStore } from '../../store/customers.store';

export default function CustomersPageWrapper({ children }: { children: React.ReactNode }) {
  const { viewSheetOpen, setViewSheetOpen } = useCustomersStore();

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
        title="Customer ID: 71cbbb9d-b6c9-44b3-b54b-493ec3e9437f"
        description="View customer details"
        size="large"
      >
        <CustomersViewSheetContent />
      </SheetContent>
    </>
  );
}
