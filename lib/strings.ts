/**
 * Converts the first character of a string to uppercase and returns the resulting string.
 *
 * @param value - The string to convert.
 * @returns The converted string.
 */
export function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
