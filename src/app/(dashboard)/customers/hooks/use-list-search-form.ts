'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { CustomerListSearchFormSchema } from '../schemas/list-search-form';
import type { CustomerListSearchForm } from '../schemas/list-search-form';

export default function useCustomersListSearchForm(search?: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<CustomerListSearchForm>({
    defaultValues: {
      search: search ?? '',
    },
    resolver: zodResolver(CustomerListSearchFormSchema),
  });

  useEffect(() => {
    form.reset({
      search: search ?? '',
    });
  }, [search, form]);

  const onSubmit = async (data: CustomerListSearchForm) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', data.search);
    router.push(`?${params.toString()}`);
  };

  return { form, onSubmit };
}
