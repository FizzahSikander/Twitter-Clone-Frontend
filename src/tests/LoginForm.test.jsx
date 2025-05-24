import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { loginUser } from '../services/userAccess';

function renderUi(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

vi.mock('../services/userAccess.js', () => ({
  loginUser: vi.fn(),
}));

vi.mock('../utils/UserContext', () => ({
  useUser: () => ({ setUser: vi.fn() }),
}));

describe('LoginForm', () => {
  it('shows email input and Next button on first render', () => {
    renderUi(<LoginForm />);
    expect(screen.getByPlaceholderText(/phone, email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('shows password input after clicking Next', async () => {
    const user = userEvent.setup();
    renderUi(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/phone, email address/i), 'hamoudi@test.com');

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows error if password is empty after clicking login', async () => {
    const user = userEvent.setup();
    renderUi(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/phone, email address/i), 'hamoudi@test.com');

    await user.click(screen.getByRole('button', { name: /next/i }));

    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByText('Password cannot be empty!')).toBeInTheDocument();
  });

  it('calls loginUser with filled inputs', async () => {
    const user = userEvent.setup();
    renderUi(<LoginForm />);
    loginUser.mockResolvedValueOnce({ message: 'Authenticated' });

    await user.type(screen.getByPlaceholderText(/phone, email address/i), 'hamoudi@test.com');

    await user.click(screen.getByRole('button', { name: /next/i }));

    await user.type(screen.getByPlaceholderText(/Password/i), 'password123');

    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(loginUser).toHaveBeenCalledWith({
      email: 'hamoudi@test.com',
      password: 'password123',
    });
  });
});
