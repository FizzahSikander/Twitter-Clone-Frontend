import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAccess';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useUser } from '../utils/UserContext';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    nickname: '',
    about: '',
    occupation: '',
    hometown: '',
    homepage: '',
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.name || !form.email || !form.nickname) {
      return setError('Please fill in all required fields.');
    }
    if (form.password !== form.confirm) {
      return setError('Passwords do not match.');
    }

    setError('');

    const res = await registerUser(form);
    if (res.error) return setError(res.error);

    setUser(res.user); // Save backend user in context
    navigate(`/profile/${res.user.nickname}`); // Go to profile
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        {/* File Upload */}
        <input
          type='file'
          accept='image/*'
          id='imageUpload'
          hidden
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <div className='img-container'>
          <label htmlFor='imageUpload' className='upload-pic'>
            {form.image ? 'Change Profile Picture' : 'Upload Profile Picture'}
          </label>
          {form.image && (
            <div className='preview'>
              <img src={URL.createObjectURL(form.image)} alt='preview' />
              <span onClick={() => setForm({ ...form, image: null })}>✕</span>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='error'>{error}</Alert>
          </Stack>
        )}

        {/* Name Field */}
        <div className='input-container'>
          <input
            type='text'
            className='input'
            placeholder='Name'
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={30}
          />
          <span className='char-count'>{form.name.length} / 30</span>
        </div>

        <input
          type='email'
          className='input'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type='text'
          className='input'
          placeholder='Nickname'
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          maxLength={30}
        />

        {/* Password Fields */}
        <div className='input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='input'
            placeholder='Password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span className='toggle' onClick={() => setShowPassword(!showPassword)}>👁</span>
        </div>

        <input
          type={showPassword ? 'text' : 'password'}
          className='input'
          placeholder='Confirm Password'
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />

        {/* Optional Fields */}
        <input
          type='text'
          className='input'
          placeholder='About (optional)'
          value={form.about}
          onChange={(e) => setForm({ ...form, about: e.target.value })}
          maxLength={30}
        />
        <input
          type='text'
          className='input'
          placeholder='Occupation (optional)'
          value={form.occupation}
          onChange={(e) => setForm({ ...form, occupation: e.target.value })}
          maxLength={30}
        />
        <input
          type='text'
          className='input'
          placeholder='Hometown (optional)'
          value={form.hometown}
          onChange={(e) => setForm({ ...form, hometown: e.target.value })}
          maxLength={30}
        />
        <input
          type='text'
          className='input'
          placeholder='Website (optional)'
          value={form.homepage}
          onChange={(e) => setForm({ ...form, homepage: e.target.value })}
          maxLength={30}
        />

        <button type='submit' className='next btn'>Sign up</button>
      </form>

      <p className='signup'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </>
  );
}
