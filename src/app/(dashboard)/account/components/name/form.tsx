'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import useAccountNameForm from '../../hooks/name/use-name-form';

export default function AccountNameForm({ handleFormShown }: { handleFormShown: () => void }) {
  const { form, onSubmit, isPending } = useAccountNameForm(handleFormShown);

  return (
    <form id="account-name-form" className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col gap-5 md:flex-row">
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="first_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="First name"
                  autoComplete="on"
                  className="text-sm text-muted-foreground"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="last_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Last name"
                  autoComplete="on"
                  className="text-sm text-muted-foreground"
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
