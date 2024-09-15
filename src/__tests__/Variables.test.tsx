import Variables from '@/components/Variables/Variables';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => dictionary,
  };
});

describe('Variables component', () => {
  it('Add more table rows on button click (//TO DO)', () => {
    render(<Variables variables={[]} setVariables={vi.fn()} />);

    const button = screen.getByRole('button', { name: dictionary.addVariable });
    expect(button).toBeTruthy();
    fireEvent.click(button);
  });
});
