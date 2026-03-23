'use client';

import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { UsersCreateSheetForm } from '../../../schemas/sheets/create-form.schema';

interface UsersCreateSheetFormProps {
  form: UseFormReturn<UsersCreateSheetForm>;
  onSubmit: (data: UsersCreateSheetForm) => Promise<void>;
}

export default function UsersCreateSheetForm({ form, onSubmit }: UsersCreateSheetFormProps) {
  return (
    <form id="users-create-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                autoComplete="on"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
