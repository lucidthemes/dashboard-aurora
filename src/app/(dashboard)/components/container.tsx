export default function MainContainer({ children, width }: { children: React.ReactNode; width?: 'narrow' | 'full' }) {
  const containerWidthClass = width === 'full' ? 'max-w-full' : '2xl:max-w-screen-x';

  return <div className={`container mx-auto ${containerWidthClass}`}>{children}</div>;
}
