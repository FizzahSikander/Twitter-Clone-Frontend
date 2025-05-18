import React from "react";

function Tweet() {
  return (
    <div className="tweet d-flex">
      <div className="user-image text-center">
        <img
          src="https://toihid.com/wp-content/uploads/2025/05/avatar.jpg"
          alt="User Image"
          className="round-image"
        />
      </div>
      <div className="tweet-form">
        <form className="d-flex flex-direction-column">
          <textarea
            rows="7"
            cols="50"
            className="tweet-text"
            placeholder="What's happening..."
          />
          <input
            type="submit"
            value="Tweet"
            className="save-tweet align-self-end"
          />
        </form>
      </div>
    </div>
  );
}

export default Tweet;
