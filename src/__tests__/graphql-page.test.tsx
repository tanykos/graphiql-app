import Page1 from '@/app/[lang]/GRAPHQL/[base64endpoint]/page';
import Page2 from '@/app/[lang]/GRAPHQL/[base64endpoint]/[base64body]/page';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const text = 'Smile';
vi.mock('@/components/graphql-page-content/graphql-page-content', () => ({
  default: () => <button>{text}</button>,
}));

describe('GRAPHQL pages', () => {
  it('Page #1', async () => {
    render(await Page1({ params: { lang: '', base64body: '', base64endpoint: '' }, searchParams: {} }));

    const submitButton = screen.getByRole('button', { name: text });
    expect(submitButton).toBeDefined();
  });
  it('Page #2', async () => {
    render(await Page2({ params: { lang: '', base64body: '', base64endpoint: '' }, searchParams: {} }));

    const submitButton = screen.getByRole('button', { name: text });
    expect(submitButton).toBeDefined();
  });
});
