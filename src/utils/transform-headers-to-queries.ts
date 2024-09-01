export default function transformHeadersToQueries(values: { [key: string]: string }): string {
  let query = '';
  for (const [key, value] of Object.entries(values)) {
    if (key.includes('key')) {
      const keyNumber = key.split('_')[1];
      if (value !== '')
        query = `${query}${query.includes('?') ? '&' : '?'}${values[key]}=${values[`value_${keyNumber}`]}`;
    }
  }
  return query;
}
