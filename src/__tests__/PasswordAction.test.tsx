import { PasswordAction } from '@/components/PasswordAction/PasswordAction';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@mui/icons-material/Visibility', () => ({
  default: () => <div data-testid="VisibilityIcon">Visibility Icon</div>,
}));

vi.mock('@mui/icons-material/VisibilityOff', () => ({
  default: () => <div data-testid="VisibilityOffIcon">VisibilityOff Icon</div>,
}));

describe('PasswordAction Component', () => {
  it('renders the visibility toggle button', () => {
    const setShowPassword = vi.fn();

    render(<PasswordAction showPassword={false} setShowPassword={setShowPassword} />);

    const button = screen.getAllByTestId('password-toggle-button');

    expect(button).not.toBeNull();
  });

  it('shows VisibilityOff icon when showPassword is true', () => {
    const setShowPassword = vi.fn();

    render(<PasswordAction showPassword={true} setShowPassword={setShowPassword} />);

    const icon = screen.getAllByTestId('VisibilityOffIcon');
    expect(icon).not.toBeNull();
  });

  it('shows Visibility icon when showPassword is false', () => {
    const setShowPassword = vi.fn();

    render(<PasswordAction showPassword={false} setShowPassword={setShowPassword} />);

    const icon = screen.getAllByTestId('VisibilityIcon');
    expect(icon).not.toBeNull();
  });

  it('calls setShowPassword on button click', () => {
    const setShowPassword = vi.fn();

    render(<PasswordAction showPassword={false} setShowPassword={setShowPassword} />);

    const toggleButton = screen.getByRole('button', { name: 'toggle password visibility' });

    fireEvent.click(toggleButton);

    expect(setShowPassword).toHaveBeenCalledTimes(1);
    expect(setShowPassword).toHaveBeenCalledWith(expect.any(Function));
  });
});
