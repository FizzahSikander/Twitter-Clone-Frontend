import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';

export const Profile = () => {
  return (
    <>
      <div className='profile-container'>
        <Navbar />
        <UserProfile />
      </div>
    </>
  );
};
