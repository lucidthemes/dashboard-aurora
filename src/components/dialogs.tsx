'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import type { User } from '@supabase/supabase-js';

import { deleteRowFromTable } from '@/actions/delete.actions';
import { deleteMedia } from '@/app/(dashboard)/media/actions/delete-media.action';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Spinner } from '@/components/ui/spinner';

function EditDialog({
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

function DeleteDialog({
  dialogOpen,
  dialogClose,
  deleteRowId,
  deleteTable,
  title,
  description,
}: {
  dialogOpen: boolean;
  dialogClose: () => void;
  deleteRowId: string | null;
  deleteTable: string | null;
  title?: string;
  description?: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (!dialogOpen || !deleteRowId || !deleteTable) return null;

  const dialogTitle = title ?? 'Delete';
  const dialogDescription = description ?? 'This action cannot be undone';

  return (
    <AlertDialog open={dialogOpen} onOpenChange={(open) => !open && dialogClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => {
              dialogClose();
              startTransition(async () => {
                const res = await deleteRowFromTable(deleteRowId, deleteTable);

                if (res.success) {
                  toast.success('Successfully deleted');
                } else {
                  toast.error('Error deleting data');
                }
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ViewMediaDialog({
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
      <DialogContent className="h-auto max-w-full overflow-hidden p-0 sm:min-w-150" aria-describedby={undefined}>
        <DialogHeader className="hidden">
          <DialogTitle>View media</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function DeleteMediaDialog({
  dialogOpen,
  dialogClose,
  deleteStoragePath,
  user,
  title,
  description,
}: {
  dialogOpen: boolean;
  dialogClose: () => void;
  deleteStoragePath: string | null;
  user: User;
  title?: string;
  description?: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (!dialogOpen || !deleteStoragePath || !user) return null;

  const dialogTitle = title ?? 'Delete';
  const dialogDescription = description ?? 'This action cannot be undone';

  return (
    <AlertDialog open={dialogOpen} onOpenChange={(open) => !open && dialogClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => {
              dialogClose();
              startTransition(async () => {
                const result = await deleteMedia(deleteStoragePath, user);

                if (result.success) {
                  toast.success('Successfully deleted');
                } else {
                  toast.error('Error deleting media');
                }
              });
            }}
          >
            {isPending && <Spinner data-icon="inline-start" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { EditDialog, DeleteDialog, ViewMediaDialog, DeleteMediaDialog };
