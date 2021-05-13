export function capitalize(str: string): string {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

export function replaceSpaces(str: string, replacement = '-'): string {
  return str.replace(' ', replacement);
}

export function html<T>(strings: TemplateStringsArray, ...values: T[]): string {
  const result = [strings[0]];
  values.forEach((value, i) => result.push(String(value), strings[i + 1]));
  return result.join('');
}
