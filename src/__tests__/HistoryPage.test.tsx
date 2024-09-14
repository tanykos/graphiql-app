import RequestsHistory from '@/app/[lang]/history/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import dictionary from '@/app/[lang]/dictionaries/en.json';

vi.mock('@/app/[lang]/dictionaries.tsx', () => {
  return { default: () => dictionary };
});

describe('History Page', () => {
  it('is rendered', async () => {
    render(await RequestsHistory({ params: { lang: 'en' } }));

    const title = screen.getByText(dictionary.requestsHistory);
    expect(title instanceof HTMLHeadingElement).toBeTruthy();
  });
});
