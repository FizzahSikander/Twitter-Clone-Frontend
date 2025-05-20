import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/profile.css';
import { useUser } from '../utils/UserContext';
import { followUser, loadProfile } from '../services/actions';

export const Profile = () => {
  const { username } = useParams();
  const { user, setUser } = useUser(); // assumes setUser exists in context

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState();

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

  if (loading) return <div>Loading profile...</div>;
  if (!profile || !user) return <div>User not found</div>;

  const isFollowing = profile.followers.includes(user.id);
  const ownProfile = profile._id === user.id;

  const handleFollow = async () => {
    const mode = isFollowing ? 'unfollow' : 'follow';

    await followUser(profile._id, mode);

    // Reload target profile
    const updatedProfile = await loadProfile(username);
    setProfile(updatedProfile.user);

    // Update logged-in user's "following" list
    setUser((prev) => {
      if (!prev) return prev;

      const alreadyFollowing = prev.following.includes(profile._id);

      return {
        ...prev,
        following: alreadyFollowing
          ? prev.following.filter((id) => id !== profile._id)
          : [...prev.following, profile._id],
      };
    });
  };


  return (
    <>
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
            <img src={profile.image} alt='Profile' className='profile-pic' />
          </div>

          <div className='profile-info'>
            {!ownProfile && (
              <div className='follow-button'>
                <button onClick={handleFollow}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            )}
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
              <span>
                <strong>{profile.following.length}</strong> Following
              </span>
              <span>
                <strong>{profile.followers.length}</strong> Followers
              </span>
            </div>
          </div>
        </div>
        {console.log(tweets)}
      </div>
    </>
  );
};
