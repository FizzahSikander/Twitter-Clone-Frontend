import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/profile.css';

export const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/profile/${username}`);
        const data = await res.json();
        setProfile(data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const getProfileImage = () => {
    if (profile?.image instanceof File) {
      return URL.createObjectURL(profile.image);
    }
    return profile?.image || 'https://placehold.co/100x100?text=Profile';
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>User not found</div>;
  }

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
          <h2>{profile.name || 'Name not provided'}</h2>
          <p className='username'>@{profile.nickname}</p>
          <p className='bio'>{profile.about || 'No bio available'}</p>

          <div className='details'>
            {profile.occupation && <span>📡 {profile.occupation}</span>}
            {profile.hometown && <span>📍 {profile.hometown}</span>}
            <span>📅 Joined just now</span>
            {profile.homepage && (
              <a href={profile.homepage} target='_blank' rel='noreferrer'>
                🔗 {profile.homepage}
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
