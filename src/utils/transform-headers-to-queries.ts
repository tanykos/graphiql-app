export default function transformHeadersToQueries(values: { [key: string]: string }): string {
  let query = '';
  for (const [key] of Object.entries(values)) {
    if (key.includes('key')) {
      const keyNumber = key.split('_')[1];
      const keyInputValue = values[key].trim();
      const valueInputValue = values[`value_${keyNumber}`].trim();
      query = `${query}${query.includes('?') ? '&' : '?'}${keyInputValue}${keyInputValue || valueInputValue ? '=' : ''}${valueInputValue}`;
    }
  }
  return query.replace('?&', '?');
}
