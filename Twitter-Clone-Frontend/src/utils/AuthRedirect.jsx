import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../services/validate';

export const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await validateUser();
        console.log(res);
        if (res.ok) navigate('/home');
        else navigate('/login');
      } catch {
        navigate('/login');
      }
    };

    check();
  }, []);

  return null;
};
