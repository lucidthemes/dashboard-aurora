'use client';

import { Dialog } from '@/components/ui/dialog';

export default function EditDialog({
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
      {children}
    </Dialog>
  );
}
