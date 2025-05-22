import RegisterForm from '../components/RegisterForm';
import { useUser } from '../utils/UserContext';
import { Navigate } from 'react-router-dom';

export function Register() {
  const { user } = useUser();
  if (user) return <Navigate to='/home' replace />;

  return (
    <div className='login-container'>
      <img src='/twitter.png' alt='Twitter' className='logo' />
      <h1 className='title'>Create an account</h1>
      <RegisterForm />
    </div>
  );
}
