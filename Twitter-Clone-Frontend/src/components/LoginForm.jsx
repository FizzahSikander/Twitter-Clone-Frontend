import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/userAccess';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showPassword && email) return setShowPassword(true);
    if (!password) return setError('Password cannot be empty!');
    setError('');
    console.log(email, password);
    const res = await loginUser({ email, password });
    console.log(res);
    res.error ? setError(res.error) : navigate(`/home`);
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>
        {!showPassword ? (
          <input
            type='text'
            className='input'
            placeholder='Phone, email address or username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <>
            <div className='input readonly'>{email}</div>
            <input
              type='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
        <button type='submit' className='next btn'>
          {showPassword ? 'Log in' : 'Next'}
        </button>
        <button type='button' className='forgot btn'>
          Forgot password?
        </button>
      </form>

      <p className='signup'>
        Don’t have an account? <Link to='/register'>Sign up</Link>
      </p>
    </>
  );
}
