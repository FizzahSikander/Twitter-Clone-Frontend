import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) return setError('Missing fields');
    if (password !== confirm) return setError('Passwords no match');
    setError('');
    console.log(name, email, password, confirm);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>

        <div className="input-container">
          <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />
          <span className="char-count">{name.length} / 30</span>
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
