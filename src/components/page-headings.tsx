'use client';

function PageHeading({ heading, className }: { heading: string; className?: string }) {
  return (
    <div className={`mb-10 ${className}`}>
      <h1 className="text-3xl font-medium">{heading}</h1>
    </div>
  );
}

function PageHeadingWithButton({
  heading,
  children,
  className,
}: {
  heading: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-10 flex items-center justify-between ${className}`}>
      <h1 className="text-3xl font-medium">{heading}</h1>
      {children}
    </div>
  );
}

export { PageHeading, PageHeadingWithButton };
