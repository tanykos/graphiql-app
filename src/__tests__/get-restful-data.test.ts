import getRestfulData from '@/api/get-restful-data';
import { DEFAULT_METHOD } from '@/const';
import { describe, expect, it, Mock, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  }),
) as Mock;

describe('Get restful data', () => {
  it(`Returns status code`, async () => {
    const response = await getRestfulData(DEFAULT_METHOD, '', {});
    expect(response.status.code).toBe(200);
  });
});
