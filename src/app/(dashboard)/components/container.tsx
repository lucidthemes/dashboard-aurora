export default function MainContainer({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: 'narrow' | 'standard' | 'full';
}) {
  const containerWidthClass =
    width === 'full' ? 'max-w-full' : width === 'narrow' ? 'lg:max-w-3xl' : '2xl:max-w-screen-x';

  return <div className={`container mx-auto ${containerWidthClass}`}>{children}</div>;
}
