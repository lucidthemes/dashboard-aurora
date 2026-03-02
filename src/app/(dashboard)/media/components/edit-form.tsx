'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import useMediaEditForm from '../use-edit-form';

export default function MediaEditForm() {
  const { form, onSubmit } = useMediaEditForm();

  return (
    <form id="media-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="alt_text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="alt_text">Alt text</FieldLabel>
              <Input
                {...field}
                id="alt_text"
                aria-invalid={fieldState.invalid}
                placeholder="Alt text"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
