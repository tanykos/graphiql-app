import Logo from '@/components/header/Logo/Logo';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Header Logo', () => {
  it('is rendered', () => {
    render(<Logo />);

    const logo = screen.getByRole('img');
    expect(logo instanceof SVGElement).toBeTruthy();
  });
});
