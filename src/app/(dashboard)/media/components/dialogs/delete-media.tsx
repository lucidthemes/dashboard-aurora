'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { deleteMedia } from '@/app/(dashboard)/media/actions/delete-media.action';
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

export default function DeleteMediaDialog({
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
