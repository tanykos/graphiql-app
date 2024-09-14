import Requests from '@/components/requests/requests';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import { REQUESTS_SEPARATOR } from '@/const';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
  };
});

const requestsQuantity = Math.ceil(Math.random() * 100);
const requests = new Array(requestsQuantity).fill('request');
const getMockLsValue: () => string = vi
  .fn()
  .mockImplementationOnce(() => '')
  .mockImplementationOnce(() => `${requests.join(REQUESTS_SEPARATOR)}`);

const key = 'someKey';
vi.mock('@/hooks/use-local-storage-history', () => {
  return { default: () => [localStorage.getItem(key), vi.fn()] };
});

const getRequests = vi.spyOn(Storage.prototype, 'getItem');

vi.mock('@/components/RouterLink/RouterLink', () => ({
  default: () => <button>API client</button>,
}));

describe('Requests (history page)', () => {
  beforeEach(() => {
    localStorage.setItem(key, getMockLsValue());
    render(<Requests />);
  });

  it('Renders API clients buttons, if there are no requests', () => {
    expect(getRequests).toHaveBeenCalledWith(key);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('Renders all requests links', () => {
    const requestsLinks = screen.getAllByRole('link');
    expect(requestsLinks.length).toBe(requestsQuantity);
  });
});
