import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useUser } from '../utils/UserContext';

export default function Navbar() {
  const { user } = useUser();

  if (!user) return null;
  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <Link to='/' className='navbar-logo'>
          Twitter
        </Link>
        <div className='navbar-links'>
          <Link to='/home'>Home</Link>
          <Link to={`/profile/${user.nickname}`}>Profile</Link>
        </div>
      </div>
    </nav>
  );
}
