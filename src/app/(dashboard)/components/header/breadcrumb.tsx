'use client';

import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function DashboardHeaderBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');

    return {
      id: index,
      label: segment,
      href,
    };
  });

  const length = breadcrumbs.length;

  const lastBreadcrumbIndex = length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs && length > 1 && <BreadcrumbSeparator className="hidden md:block" />}
        {breadcrumbs &&
          length > 1 &&
          breadcrumbs.map((breadcrumb, index) => {
            if (index != length - 1) {
              return (
                <BreadcrumbItem key={breadcrumb.id}>
                  <BreadcrumbLink href={breadcrumb.href} className="capitalize">
                    {breadcrumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
          })}
        {breadcrumbs && length >= 1 && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{breadcrumbs[lastBreadcrumbIndex].label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
