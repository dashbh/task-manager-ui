import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  it('renders login form', async () => {
    const onSubmitMock = vi.fn().mockResolvedValue(undefined);

    render(<LoginForm onSubmit={onSubmitMock} error="" isLoading={false} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith('admin', 'admin123');
  });

  it('displays error message', () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        error="Invalid credentials"
        isLoading={false}
      />,
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
