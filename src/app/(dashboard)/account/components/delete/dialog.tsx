'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import useAccountDeleteForm from '../../hooks/delete/use-delete-form';

export default function AccountDeleteDialog({
  dialogOpen,
  handleDialogOpen,
}: {
  dialogOpen: boolean;
  handleDialogOpen: () => void;
}) {
  const { form, onSubmit, isPending } = useAccountDeleteForm(handleDialogOpen);

  return (
    <Dialog open={dialogOpen} onOpenChange={() => handleDialogOpen()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            Type <span className="font-medium">DELETE</span> below to confirm
          </DialogDescription>
        </DialogHeader>
        <form id="account-delete-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="confirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input {...field} id="confirm" aria-invalid={fieldState.invalid} autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="account-delete-form" variant="destructive" className="cursor-pointer">
            {isPending && <Spinner data-icon="inline-start" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
