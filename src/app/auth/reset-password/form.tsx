'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import useResetPasswordForm from './use-form';

export function ResetPasswordForm() {
  const { form, onSubmit, isPending } = useResetPasswordForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            Save new password
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
