'use client';

import { Controller, useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import type { SidebarsForm } from '../../schemas/form/form.schema';
import SidebarsFormWidgets from './widgets/widgets';

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldLegend,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function SidebarsForm({
  form,
  onSubmit,
  formType,
  formId,
}: {
  form: UseFormReturn<SidebarsForm>;
  onSubmit: (data: SidebarsForm) => Promise<void>;
  formType: 'create' | 'edit';
  formId: string;
}) {
  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-7.5">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="Name" autoComplete="off" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input {...field} id="title" aria-invalid={fieldState.invalid} placeholder="Title" autoComplete="off" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <SidebarsFormWidgets />
      </div>
    </form>
  );
}
