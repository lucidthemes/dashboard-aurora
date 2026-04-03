'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { deleteDialogDeleteRowFromTable } from '@/actions/delete-dialog.action';
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

export default function DeleteDialog({
  dialogOpen,
  dialogClose,
  deleteRowId,
  deleteTable,
  deletePath,
  deleteLogEventName,
  deleteLogEventMessage,
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
