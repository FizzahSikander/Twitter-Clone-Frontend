import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../services/authentication.js';

export const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await Auth();
        console.log(res);
        if (res.id) navigate('/home');
        else navigate('/login');
      } catch {
        navigate('/login');
      }
    };

    check();
  }, []);

  return null;
};
