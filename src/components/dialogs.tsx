'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { deleteDialogDeleteRowFromTable } from '@/actions/delete-dialog.action';
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
  deletePath,
  deleteLogEventName,
  deleteLogEventMessage,
  userId,
  title,
  description,
}: {
  dialogOpen: boolean;
  dialogClose: () => void;
  deleteRowId: string | null;
  deleteTable: string | null;
  deletePath: string;
  deleteLogEventName: string;
  deleteLogEventMessage: string;
  userId: string;
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
              startTransition(async () => {
                const result = await deleteDialogDeleteRowFromTable(
                  deleteRowId,
                  deleteTable,
                  deletePath,
                  deleteLogEventName,
                  deleteLogEventMessage,
                  userId,
                );

                if (result.success) {
                  toast.success('Successfully deleted');
                  dialogClose();
                } else {
                  toast.error('Error deleting data');
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
      <DialogContent className="max-w-container h-auto overflow-hidden p-0 sm:min-w-150" aria-describedby={undefined}>
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
  userId,
  title,
  description,
}: {
  dialogOpen: boolean;
  dialogClose: () => void;
  deleteStoragePath: string | null;
  userId: string;
  title?: string;
  description?: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (!dialogOpen || !deleteStoragePath || !userId) return null;

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
              startTransition(async () => {
                const result = await deleteMedia(deleteStoragePath, userId);

                if (result.success) {
                  toast.success('Successfully deleted');
                  dialogClose();
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
