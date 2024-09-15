import RestfulClientForm from '@/components/restful-client/RestfulClientForm';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import { RestfulParams } from '@/types/restful';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
    useState: () => ['', vi.fn()],
    useRef: vi.fn(),
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useRouter: vi.fn(),
    usePathname: () => '',
  };
});

const params: RestfulParams = { lang: '', method: 'GET', base64Url: '', base64Body: '' };
describe('RESTful Client page', () => {
  it('Renders Variables in RESTful Client form', () => {
    render(<RestfulClientForm params={params} />);

    const addVarsButton = screen.getByText(dictionary.addVariable);
    expect(addVarsButton).toBeDefined();
  });
});
