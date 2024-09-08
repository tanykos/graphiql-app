export default function transformHeadersToQueries(values: { [key: string]: string }): string {
  let query = '';
  for (const [key, value] of Object.entries(values)) {
    console.log('key: ', key);
    console.log('value: ', value);
    if (key.includes('key')) {
      const keyNumber = key.split('_')[1];
      query = `${query}${query.includes('?') ? '&' : '?'}${values[key]}=${values[`value_${keyNumber}`]}`;
    }
  }
  return query;
}
