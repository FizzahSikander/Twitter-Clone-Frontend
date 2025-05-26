import { DEFAULT_IMG } from './Formatter';
import Navbar from '../components/Navbar';

export const NotFound = () => {
  return (
    <>
      <div className='content'>
        <div className='banner'>
          <img
            src='https://placehold.co/600x200?text=Banner+Image'
            alt='Banner'
            className='banner-img'
          />
        </div>
        <div className='profile-content'>
          <div className='profile-pic-container'>
            <img src={DEFAULT_IMG} alt='Profile' className='profile-pic' />
          </div>

          <div className='profile-info'>
            <b>User not found</b>
            <div className='follow-stats'></div>
          </div>
        </div>
      </div>
    </>
  );
};
