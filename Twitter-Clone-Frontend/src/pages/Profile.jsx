import React from 'react';
import '../styles/profile.css';
import { useUser } from '../utils/UserContext';

export const Profile = () => {
  const { user } = useUser();

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className='profile-container'>
      <div className='banner'>
        <img
          src='https://placehold.co/600x200?text=Banner+Image'
          alt='Banner'
          className='banner-img'
        />
      </div>

      <div className='profile-content'>
        <div className='profile-pic-container'>
          <img
            src={
              user.image instanceof File
                ? URL.createObjectURL(user.image)
                : user.image || 'https://placehold.co/100x100?text=Profile'
            }
            alt='Profile'
            className='profile-pic'
          />
        </div>

        <div className='follow-button'>
          <button>Follow</button>
        </div>

        <div className='profile-info'>
          <h2>{user.name}</h2>
          <p className='username'>@{user.nickname}</p>
          <p className='bio'>{user.about || 'No bio yet.'}</p>

          <div className='details'>
            {user.occupation && <span>💼 {user.occupation}</span>}
            {user.hometown && <span>📍 {user.hometown}</span>}
            {user.homepage && (
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
