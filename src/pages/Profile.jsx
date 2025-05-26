import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/profile.css';
import { useUser } from '../utils/UserContext';
import { followUser, loadProfile } from '../services/actions';
import { NotFound } from '../utils/NotFound';
import Navbar from '../components/Navbar';
import { FormatDate } from '../utils/Formatter';

export const Profile = () => {
  const { username } = useParams();
  const { user } = useUser();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState();
  const [img, setImg] = useState();
  const [banner, setBanner] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await loadProfile(username);
        setProfile(profile.user);
        setTweets(profile.tweets);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  // loading
  if (loading) return <div>Loading profile...</div>;
  if (!profile || !user) return <NotFound />;

  const isFollowing = profile.followers.includes(user.id);
  const ownProfile = profile._id === user.id;

  const handleFollow = async () => {
    const mode = isFollowing ? 'unfollow' : 'follow';
    await followUser(profile._id, mode);
    const { user } = await loadProfile(username);
    setProfile(user);
  };

  return (
    <>
      <div className='profile-container'>
        <Navbar />

        <div className='content'>
          <div className='banner'>
            {img ? (
              <img src={URL.createObjectURL(img)} alt='pic' className='banner-img' />
            ) : (
              <label htmlFor='imageUpload'>
                <img
                  src='https://placehold.co/600x200?text=Banner+Image'
                  alt='Banner'
                  className='banner-img'
                />
              </label>
            )}

            <input
              type='file'
              accept='image/*'
              id='imageUpload'
              hidden
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className='profile-content'>
            <div className='profile-pic-container'>
              <div className='profile-pic-wrapper'>
                <img
                  src={img ? URL.createObjectURL(img) : profile.image}
                  alt='Profile'
                  className='profile-pic'
                />

                {ownProfile && (
                  <label htmlFor='imageUpload' className='edit-pen'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='24px'
                      viewBox='0 0 24 24'
                      width='24px'
                      fill='black'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z' />
                    </svg>
                  </label>
                )}
              </div>
            </div>

            <div className='profile-info'>
              {!ownProfile && (
                <div className='follow-button'>
                  <button onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'} </button>
                </div>
              )}
              <h2>{profile.name || 'Name not provided'}</h2>
              <p className='username'>@{profile.nickname}</p>
              <p className='bio'>{profile.about || 'No bio available'}</p>
              <div className='details'>
                {profile.occupation && <span>📡 {profile.occupation}</span>}
                {profile.hometown && <span>📍 {profile.hometown}</span>}
                <span>{FormatDate(profile.createdAt)}</span>
                {profile.homepage && (
                  <a href={profile.homepage} target='_blank' rel='noreferrer'>
                    🔗 {profile.homepage}
                  </a>
                )}
              </div>
              <div className='follow-stats'>
                <span>
                  <strong>{profile.following.length}</strong> Following
                </span>
                <span>
                  <strong>{profile.followers.length}</strong> Followers
                </span>
              </div>
            </div>
          </div>
          {tweets.map((tweet) => (
            <div className='tweet-card' key={tweet._id}>
              <div className='tweet-header'>
                <img src={profile.image} alt='avatar' className='tweet-avatar' />
                <div className='tweet-user-info'>
                  <span className='tweet-name'>{profile.name}</span>
                  <span className='tweet-nick'>
                    @{profile.nickname} · {new Date(tweet.createdAt).toLocaleString()}
                  </span>
                </div>
                <span className='tweet-options'>⋯</span>
              </div>

              <p className='tweet-text'>{tweet.text}</p>

              <div>
                <span>💬</span>
                <span>1</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
