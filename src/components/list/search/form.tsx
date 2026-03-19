'use client';

import { Controller } from 'react-hook-form';

import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

import useListSearchForm from '@/components/list/search/use-form';

export default function ListSearchForm({ placeholder, search }: { placeholder: string; search?: string }) {
  const { form, onSubmit } = useListSearchForm(search);

  return (
    <form id="list-search-form" className="relative flex w-full lg:w-80" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="search"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="search"
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" variant="ghost" size="icon" className="absolute top-0 right-0 cursor-pointer">
        <Search />
      </Button>
    </form>
  );
}
