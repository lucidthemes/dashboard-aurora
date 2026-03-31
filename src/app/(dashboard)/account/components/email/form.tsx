'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import useAccountEmailForm from '../../hooks/email/use-email-form';

export default function AccountEmailForm({ handleFormShown }: { handleFormShown: () => void }) {
  const { form, onSubmit, isPending } = useAccountEmailForm(handleFormShown);

  return (
    <form id="account-email-form" className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email address"
                autoComplete="on"
                className="text-sm text-muted-foreground"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" variant="default" className="flex w-fit cursor-pointer self-end">
        {isPending && <Spinner data-icon="inline-start" />}
        Save changes
      </Button>
    </form>
  );
}
