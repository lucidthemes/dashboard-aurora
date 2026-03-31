'use client';

import { PageHeading } from '@/components/page-headings';

import AccountAppearanceOptions from './options';

export default function AccountAppearance() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeading
        heading="Appearance"
        headingLevel={2}
        subHeading="Choose the theme for the Aurora dashboard"
        className="mb-0!"
      />
      <div className="flex flex-col gap-4 rounded-md border border-1 p-5">
        <AccountAppearanceOptions />
      </div>
    </div>
  );
}
