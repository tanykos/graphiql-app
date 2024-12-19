import getGraphQlSchema from '@/api/get-graphql-schema';
import { describe, expect, it, Mock, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({}),
  }),
) as Mock;

describe('Get graphql schema', () => {
  it(`Returns 'undefined' if response status is not ok`, async () => {
    const response = await getGraphQlSchema('');
    expect(response).toBeUndefined();
  });
});
