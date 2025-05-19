import React from 'react';
import { useUser } from '../utils/UserContext';
import '../styles/profile.css';

export const Profile = () => {
  const { user } = useUser();

  const getProfileImage = () => {
    if (user?.image instanceof File) {
      return URL.createObjectURL(user.image);
    }
    return user?.image || 'https://placehold.co/100x100?text=Profile';
  };

  return (
    <div className='profile-container'>
      <div className='banner'>
        <img src='https://placehold.co/600x200?text=Banner+Image' alt='Banner' className='banner-img' />
      </div>

      <div className='profile-content'>
        <div className='profile-pic-container'>
          <img src={getProfileImage()} alt='Profile' className='profile-pic' />
        </div>

        <div className='profile-info'>
          <h2>{user?.name || 'Name not provided'}</h2>
          <p className='username'>@{user?.nickname}</p>
          <p className='bio'>{user?.about || 'No bio available'}</p>

          <div className='details'>
            {user?.occupation && <span>📡 {user.occupation}</span>}
            {user?.hometown && <span>📍 {user.hometown}</span>}
            <span>📅 Joined just now</span>
            {user?.homepage && (
              <a href={user.homepage} target='_blank' rel='noreferrer'>
                🔗 {user.homepage}
              </a>
            )}
          </div>

          <div className='follow-stats'>
            <span><strong>0</strong> Following</span>
            <span><strong>0</strong> Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
