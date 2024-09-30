import GraphQlPageContent from '@/components/graphql-page-content/graphql-page-content';
import { GraphQlUrlParams } from '@/types/graphql';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

const params: GraphQlUrlParams = { lang: '', base64endpoint: '', base64body: '' };
describe('GraphQL dynamic pages', () => {
  it('Renders GraphiQL form', async () => {
    render(await GraphQlPageContent({ params, searchParams: {} }));

    const submitButton = screen.getByRole('button', { name: dictionary.send });
    expect(submitButton).toBeTruthy();
  });
});
