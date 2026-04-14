'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import useAccountPasswordForm from '../../hooks/password/use-password-form';

export default function AccountPasswordForm({ handleFormShown }: { handleFormShown: () => void }) {
  const { form, onSubmit, isPending } = useAccountPasswordForm(handleFormShown);

  const [currentPasswordShow, setCurrentPasswordShow] = useState(false);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  return (
    <form id="account-name-form" className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col gap-5">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="currentPassword"
                    type={!currentPasswordShow ? 'password' : 'text'}
                    aria-invalid={fieldState.invalid}
                    placeholder="Current password"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={!currentPasswordShow ? 'Show password' : 'Hide password'}
                      title={!currentPasswordShow ? 'Show password' : 'Hide password'}
                      size="icon-sm"
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentPasswordShow((prevState) => !prevState);
                      }}
                    >
                      {!currentPasswordShow ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="newPassword"
                    type={!newPasswordShow ? 'password' : 'text'}
                    aria-invalid={fieldState.invalid}
                    placeholder="New password"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={!newPasswordShow ? 'Show password' : 'Hide password'}
                      title={!newPasswordShow ? 'Show password' : 'Hide password'}
                      size="icon-sm"
                      className="cursor-pointer"
                      onClick={() => {
                        setNewPasswordShow((prevState) => !prevState);
                      }}
                    >
                      {!newPasswordShow ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="confirmPassword"
                    type={!confirmPasswordShow ? 'password' : 'text'}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm new password"
                    autoComplete="off"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={!confirmPasswordShow ? 'Show password' : 'Hide password'}
                      title={!confirmPasswordShow ? 'Show password' : 'Hide password'}
                      size="icon-sm"
                      className="cursor-pointer"
                      onClick={() => {
                        setConfirmPasswordShow((prevState) => !prevState);
                      }}
                    >
                      {!confirmPasswordShow ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
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
