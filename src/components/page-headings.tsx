'use client';

import type { ElementType } from 'react';

interface PageHeadingProps {
  heading: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  subHeading?: string;
  className?: string;
}

function PageHeading({ heading, headingLevel = 1, subHeading, className }: PageHeadingProps) {
  const HeadingTag = `h${headingLevel}` as ElementType;

  let headingLayoutClasses = 'mb-10 ';

  if (subHeading) headingLayoutClasses = headingLayoutClasses + 'flex flex-col gap-2 ';
  if (className) headingLayoutClasses = headingLayoutClasses + className;

  let headingFontClass = 'text-3xl';

  if (headingLevel != 1) {
    switch (headingLevel) {
      case 2:
        headingFontClass = 'text-2xl';
        break;
      case 3:
        headingFontClass = 'text-xl';
        break;
      case 4:
      case 5:
      case 6:
        headingFontClass = 'text-lg';
        break;
    }
  }

  return (
    <div className={headingLayoutClasses.trim()}>
      {heading && <HeadingTag className={`${headingFontClass} font-medium`}>{heading}</HeadingTag>}
      {subHeading && <span className="text-sm text-muted-foreground">{subHeading}</span>}
    </div>
  );
}

interface PageHeadingWithButtonProps {
  heading: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  subHeading?: string;
  children?: React.ReactNode;
  className?: string;
}

function PageHeadingWithButton({
  heading,
  headingLevel = 1,
  subHeading,
  children,
  className,
}: PageHeadingWithButtonProps) {
  const HeadingTag = `h${headingLevel}` as ElementType;

  const headingLayoutClasses = subHeading ? 'flex flex-col gap-2 ' : '';

  let headingFontClass = 'text-3xl';

  if (headingLevel != 1) {
    switch (headingLevel) {
      case 2:
        headingFontClass = 'text-2xl';
        break;
      case 3:
        headingFontClass = 'text-xl';
        break;
      case 4:
      case 5:
      case 6:
        headingFontClass = 'text-lg';
        break;
    }
  }

  return (
    <div className={`mb-10 flex items-center justify-between ${className ?? ''}`}>
      <div className={headingLayoutClasses}>
        <HeadingTag className={`${headingFontClass} font-medium`}>{heading}</HeadingTag>
        {subHeading && <span>{subHeading}</span>}
      </div>
      {children}
    </div>
  );
}

export { PageHeading, PageHeadingWithButton };
