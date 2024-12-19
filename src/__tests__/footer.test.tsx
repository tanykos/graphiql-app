import Footer from '../components/footer/footer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';

vi.mock('../app/[lang]/dictionaries', () => {
  return { default: vi.fn() };
});

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return { ...actual, use: () => dictionary };
});

describe('Footer', () => {
  it('Footer is rendered', () => {
    render(<Footer locale={'en'} />);

    const svgArr = screen.getAllByRole('img');
    expect(svgArr.length).toBe(3 + 1);
  });
});
