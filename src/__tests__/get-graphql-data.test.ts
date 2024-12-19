import getGraphQlData from '@/api/get-graphql-data';
import { describe, expect, it, Mock, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  }),
) as Mock;

describe('Get graphql data', () => {
  it(`Returns status code`, async () => {
    const response = await getGraphQlData('', {});
    expect(response.status.code).toBe(200);
  });
});
