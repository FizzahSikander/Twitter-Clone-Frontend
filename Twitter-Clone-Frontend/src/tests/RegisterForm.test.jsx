import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../components/RegisterForm';
import { MemoryRouter } from 'react-router-dom';
import { registerUser } from '../services/userAccess';

function renderUi(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

vi.mock('../services/userAccess.js', () => ({
  registerUser: vi.fn(),
}));

describe('RegisterForm', () => {
  it('shows inputs and Sign up button on first render', () => {
    renderUi(<RegisterForm />);
    expect(screen.getByPlaceholderText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nickname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/About/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
  });

  it('shows error if required fields is missing', async () => {
    const user = userEvent.setup();
    renderUi(<RegisterForm />);

    const registerBtn = screen.getByRole('button', { name: /Sign up/i });
    await user.click(registerBtn);
    expect(screen.getByText('Missing fields')).toBeInTheDocument();
  });

  it('shows error if password missmatch', async () => {
    const user = userEvent.setup();
    renderUi(<RegisterForm />);
    await user.type(screen.getByPlaceholderText(/^Name$/i), 'hamoudi');
    await user.type(screen.getByPlaceholderText(/Email/i), 'test@test.com');
    await user.type(screen.getByPlaceholderText(/Nickname/i), 'hamo');
    await user.type(screen.getByPlaceholderText(/^Password$/i), '999');
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), '000');
    await user.click(screen.getByRole('button', { name: /Sign up/i }));
    expect(screen.getByText('Passwords no match')).toBeInTheDocument();
  });

  it('calls registerUser after validated inputs', async () => {
    const user = userEvent.setup();
    renderUi(<RegisterForm />);
    registerUser.mockResolvedValueOnce({ message: 'User created' });

    await user.type(screen.getByPlaceholderText(/^Name$/i), 'hamoudi');
    await user.type(screen.getByPlaceholderText(/Email/i), 'test@test.com');
    await user.type(screen.getByPlaceholderText(/Nickname/i), 'hamo');
    await user.type(screen.getByPlaceholderText(/^Password$/i), '999');
    await user.type(screen.getByPlaceholderText(/Confirm Password/i), '999');
    await user.click(screen.getByRole('button', { name: /Sign up/i }));
    expect(screen.getByText('User created')).toBeInTheDocument();
    expect(registerUser).toHaveBeenCalled();
  });
});
