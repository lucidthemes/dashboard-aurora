'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

export default function SheetForm({
  sheetOpen,
  sheetClose,
  formId,
  children,
  title,
  description,
  size = 'default',
  submitButtonText = 'Save changes',
  submitIsPending = false,
}: {
  sheetOpen: boolean;
  sheetClose: () => void;
  formId: string;
  children: React.ReactNode;
  title: string;
  description?: string;
  size?: 'default' | 'medium' | 'large' | 'xlarge';
  submitButtonText?: string;
  submitIsPending?: boolean;
}) {
  if (!sheetOpen) return null;

  const sheetDescription = description ?? "Make changes below. Click save when you're done.";

  let sheetSizeClasses = 'sm:max-w-sm';

  if (size === 'medium') sheetSizeClasses = 'sm:max-w-lg';
  if (size === 'large') sheetSizeClasses = 'sm:max-w-2xl';
  if (size === 'xlarge') sheetSizeClasses = 'sm:max-w-3xl';

  return (
    <Sheet open={sheetOpen} onOpenChange={(open) => !open && sheetClose()}>
      <SheetContent className={sheetSizeClasses}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{sheetDescription}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">{children}</div>
        <SheetFooter className="gap-y-4">
          <Button type="submit" form={formId} className="cursor-pointer" disabled={submitIsPending}>
            {submitIsPending && <Spinner data-icon="inline-start" />}
            {submitButtonText}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
