import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/register';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function RegisterForm() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !email) return setError('Missing fields');
    if (password !== confirm) return setError('Passwords no match');
    setError('');
    setMessage('');

    const params = { user, email, password };
    const res = await registerUser(params);
    res.message ? setMessage(res.message) : setError(res.error);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {message && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success" variant="filled" color="info">
              {message}
            </Alert>
          </Stack>
        )}

        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}
        <div className="input-container">
          <input type="text" className="input" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} maxLength={30} />
          <span className="char-count">{user.length} / 30</span>
        </div>

        <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="input-container">
          <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
            👁
          </span>
        </div>

        <input type={showPassword ? 'text' : 'password'} className="input" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

        <button type="submit" className="next btn">
          Sign up
        </button>
      </form>

      <p className="signup">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </>
  );
}
