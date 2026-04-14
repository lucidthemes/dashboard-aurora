'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import useAccountPasswordForm from '../../hooks/password/use-password-form';

export default function AccountPasswordForm({ handleFormShown }: { handleFormShown: () => void }) {
  const { form, onSubmit, isPending } = useAccountPasswordForm(handleFormShown);

  return (
    <form id="account-name-form" className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col gap-5">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="currentPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Current password"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="newPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="New password"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm new password"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <Button type="submit" variant="default" className="flex w-fit cursor-pointer self-end">
        {isPending && <Spinner data-icon="inline-start" />}
        Save changes
      </Button>
    </form>
  );
}
