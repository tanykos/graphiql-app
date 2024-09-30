import ResponseViewer from '@/components/response-viewer/response-viewer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';
import { ApiResponse } from '@/types';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
  };
});

const testValue = 'testValue';
const statusCode = 200;
const testResponse: ApiResponse = { data: { testKey: 'testValue' }, status: { code: statusCode, text: '' } };

describe('Response viewer', () => {
  it('Renders response', () => {
    render(<ResponseViewer response={testResponse} />);

    const status = screen.getByText(statusCode);
    expect(status).toBeDefined();

    const data = screen.getByText(`"${testValue}"`);
    expect(data).toBeDefined();
  });
});
