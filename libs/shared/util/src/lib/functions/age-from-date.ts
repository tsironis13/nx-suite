export function convertDateToYearsOfAge(date: string | Date): number {
  if (!date) {
    throw new Error('No date provided.');
  }

  const dateOfBirth =
    typeof date === 'string' ? new Date(date) : (date as Date);

  const timeDiff = Math.abs(Date.now() - dateOfBirth.getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
}
