import React from 'react';
import '../styles/profile.css';

export const Profile = () => {
  return (
    <div className="profile-container">
      <div className="banner">
        <img
          src="https://placehold.co/600x200?text=Banner+Image"
          alt="Banner"
          className="banner-img"
        />
      </div>

      <div className="profile-content">
        <div className="profile-pic-container">
          <img
            src="https://placehold.co/100x100?text=Profile"
            alt="Profile"
            className="profile-pic"
          />
        </div>

        <div className="follow-button">
          <button>Follow</button>
        </div>

        <div className="profile-info">
          <h2>Daniel Feldman</h2>
          <p className="username">@d_feldman</p>
          <p className="bio">Taking a short twitter vacation</p>

          <div className="details">
            <span>📡 Astronomer</span>
            <span>📍 Minneapolish</span>
            <span>📅 Joined November 2010</span>
            <a href="https://youtu.be/wkKGR-FMqQQ?t=..." target="_blank" rel="noreferrer">
              🔗 Link
            </a>
          </div>

          <div className="follow-stats">
            <span><strong>10.2K</strong> Following</span>
            <span><strong>13.8K</strong> Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
