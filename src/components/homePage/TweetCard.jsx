import React, { useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comments from "./Comments";

function TweetCard() {
  const [showComments, setShowComments] = useState(false);
  const handleCommentButton = (e) => {
    setShowComments(!showComments);
  };

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
        <div className="d-flex flex-direction-column">
          <div className="tweet-heading">
            <b>Patrik</b> @nick - 40min{" "}
          </div>
          <div className="tweet-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem esse architecto vero pariatur excepturi mollitia
            rerum ipsam perspiciatis! Rerum fuga nobis aut ipsum, quod
            exercitationem mollitia error tempora ab doloremque.
          </div>
          <div className="tweet-comment d-flex flex-direction-column  ">
            <div
              className="commentIcon pe-10 p-10"
              onClick={(e) => handleCommentButton(e)}
            >
              <ChatBubbleOutlineIcon /> <span className="commentCount">11</span>
            </div>
            {showComments && (
              <div className="comments">
                <Comments></Comments>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
