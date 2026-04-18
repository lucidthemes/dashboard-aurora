// returns width class when rendering block
export function blockWidthClass(width: string) {
  switch (width) {
    case 'standard':
      return '2xl:max-w-screen-xl';
    case 'wide':
      return '2xl:max-w-screen-2xl';
    case 'full':
      return 'max-w-full';
    default:
      return '2xl:max-w-screen-xl';
  }
}

// returns align class when rendering block
export function blockAlignClass(align: string) {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
}

// return custom classes with commas swapped for spaces
export function blockCustomClassesFormat(customClasses: string) {
  if (!customClasses) return;

  // remove white space from beginning/end of classes and within them
  const trimmedClasses = customClasses.trim().replaceAll(' ', '');

  // replace commas with spaces
  const formattedClasses = trimmedClasses.replaceAll(',', ' ').trim();

  return formattedClasses;
}
