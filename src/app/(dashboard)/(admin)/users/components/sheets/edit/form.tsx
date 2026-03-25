'use client';

import { Controller } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import type { UsersEditSheetForm } from '../../../schemas/sheets/edit-form.schema';
import { useUsersStore } from '../../../store/users-store';

interface UsersEditSheetFormProps {
  form: UseFormReturn<UsersEditSheetForm>;
  onSubmit: (data: UsersEditSheetForm) => Promise<null | undefined>;
}

export default function UsersEditSheetForm({ form, onSubmit }: UsersEditSheetFormProps) {
  const { editSheetUser } = useUsersStore();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Id</p>
        <p className="text-sm">{editSheetUser?.id}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Email</p>
        <p className="text-sm">{editSheetUser?.email}</p>
      </div>
      <form id="users-edit-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem value="customer" className="cursor-pointer">
                        Customer
                      </SelectItem>
                      <SelectItem value="editor" className="cursor-pointer">
                        Editor
                      </SelectItem>
                      <SelectItem value="admin" className="cursor-pointer">
                        Admin
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
