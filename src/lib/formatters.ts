export function dateFormat(date: string | Date) {
  const dateFormat = new Date(date);
  const formattedDate = dateFormat.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate;
}
