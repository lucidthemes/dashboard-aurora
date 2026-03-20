'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ViewMediaDialog({
  dialogOpen,
  dialogClose,
  children,
}: {
  dialogOpen: boolean;
  dialogClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => !open && dialogClose()}>
      <DialogContent className="max-w-container h-auto overflow-hidden p-0 sm:min-w-150" aria-describedby={undefined}>
        <DialogHeader className="hidden">
          <DialogTitle>View media</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
