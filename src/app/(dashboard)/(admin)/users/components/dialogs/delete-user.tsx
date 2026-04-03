'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

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

import { deleteUser } from '../../actions/delete-user.action';

export default function UsersDeleteUserDialog({
  dialogOpen,
  dialogClose,
  deleteUserId,
}: {
  dialogOpen: boolean;
  dialogClose: () => void;
  deleteUserId: string | null;
}) {
  const [isPending, startTransition] = useTransition();

  if (!dialogOpen || !deleteUserId) return null;

  return (
    <AlertDialog open={dialogOpen} onOpenChange={(open) => !open && dialogClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete user</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const result = await deleteUser({ deleteUserId });

                if (result.success) {
                  toast.success('Successfully deleted');
                  dialogClose();
                } else {
                  toast.error('Error deleting user');
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
