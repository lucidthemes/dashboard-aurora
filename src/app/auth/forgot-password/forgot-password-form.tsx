'use client';

import Link from 'next/link';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import useForgotPasswordForm from './use-forgot-password-form';

export function ForgotPasswordForm() {
  const { form, onSubmit, isPending } = useForgotPasswordForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="'flex gap-6' flex-col">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending && <Spinner data-icon="inline-start" />}
            Reset password
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
