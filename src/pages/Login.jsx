import LoginForm from '../components/LoginForm';
import { useUser } from '../utils/UserContext';
import { Navigate } from 'react-router-dom';

export function Login() {
  const { user } = useUser();
  if (user) return <Navigate to='/home' replace />;
  return (
    <div className='login-container'>
      <img src='/twitter.png' alt='Twitter' className='logo' />
      <h1 className='title'>Sign in to Twitter</h1>
      <LoginForm />
    </div>
  );
}
