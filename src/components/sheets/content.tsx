'use client';

import {
  Sheet,
  SheetClose,
  SheetContent as ShadcnSheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function SheetContent({
  sheetOpen,
  sheetClose,
  children,
  title,
  description,
  size = 'default',
}: {
  sheetOpen: boolean;
  sheetClose: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  size?: 'default' | 'medium' | 'large' | 'xlarge';
}) {
  if (!sheetOpen) return null;

  let sheetSizeClasses = 'sm:max-w-sm';

  if (size === 'medium') sheetSizeClasses = 'sm:max-w-lg';
  if (size === 'large') sheetSizeClasses = 'sm:max-w-2xl';
  if (size === 'xlarge') sheetSizeClasses = 'sm:max-w-3xl';

  return (
    <Sheet open={sheetOpen} onOpenChange={(open) => !open && sheetClose()}>
      <ShadcnSheetContent className={sheetSizeClasses}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">{children}</div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </ShadcnSheetContent>
    </Sheet>
  );
}
