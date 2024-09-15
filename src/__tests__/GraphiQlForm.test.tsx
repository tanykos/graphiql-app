import GraphiQlForm from '@/components/graphiql-form/graphiql-form';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
    useState: () => ['', vi.fn()],
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useSearchParams: () => '',
    useRouter: () => ({
      push: vi.fn(),
    }),
    usePathname: () => '',
  };
});

const key = 'someKey';
vi.mock('@/hooks/use-local-storage-history', () => {
  return {
    default: () => [
      '',
      () => {
        localStorage.setItem(key, '');
      },
    ],
  };
});

const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

describe('GraphiQl Form', () => {
  it('Saves request to LS on form submit', async () => {
    render(<GraphiQlForm />);

    const endpoint = screen.getByText(dictionary.graphql.endpointUrl);
    const input = endpoint.parentElement?.nextElementSibling as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'someEndpoint' } });

    const submitButton = screen.getByText(dictionary.send);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith(key, '');
    });
  });
});
