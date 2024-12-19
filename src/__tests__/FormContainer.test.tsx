import { FormContainer } from '@/components/AuthForm/FormContainer/FormContainer';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormEvent } from 'react';
import { describe, it, expect, vi } from 'vitest';

describe('FormContainer', () => {
  const mockOnSubmit = vi.fn((e: FormEvent) => {
    e.preventDefault();
  });

  const mockData = {
    title: 'Test Form',
    buttonText: 'Submit',
    disabled: false,
    note: 'Already have an account?',
    linkText: 'Log in',
    href: '/login',
  };

  it('renders correctly with provided data', () => {
    render(
      <FormContainer data={mockData} onSubmit={mockOnSubmit}>
        <input placeholder="Test Input" />
      </FormContainer>,
    );

    expect(screen.getByRole('heading', { name: mockData.title })).toBeDefined();

    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: mockData.buttonText });
    expect(submitButton).toBeDefined();
    expect(submitButton.disabled).toBe(false);

    expect(screen.getByText(mockData.linkText)).toBeDefined();
  });

  it('calls onSubmit when form is submitted', () => {
    render(
      <FormContainer data={mockData} onSubmit={mockOnSubmit}>
        <input placeholder="Test Input" />
      </FormContainer>,
    );

    const submitButton = screen.getByRole('button', { name: mockData.buttonText });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('disables the submit button when data.disabled is true', () => {
    const disabledData = { ...mockData, disabled: true };

    render(
      <FormContainer data={disabledData} onSubmit={mockOnSubmit}>
        <input placeholder="Test Input" />
      </FormContainer>,
    );

    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: disabledData.buttonText });
    expect(submitButton.disabled).toBe(true);
  });

  it('renders children correctly', () => {
    render(
      <FormContainer data={mockData} onSubmit={mockOnSubmit}>
        <input placeholder="Test Input" />
      </FormContainer>,
    );

    expect(screen.getByPlaceholderText('Test Input')).toBeDefined();
  });
});
