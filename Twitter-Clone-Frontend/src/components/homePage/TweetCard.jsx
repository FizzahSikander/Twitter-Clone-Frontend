import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Comments from "./Comments";
import { getFetchHandler } from "../../utils/FetchHandler";
import UserInfo from "./UserInfo";

function TweetCard({ followingId }) {
  const [showComments, setShowComments] = useState(false);
  const [latestTweet, setLatestTweet] = useState([]);
  const [message, setMessage] = useState("");
  const handleCommentButton = (e) => {
    setShowComments(!showComments);
  };
  const getLatestTweet = async () => {
    const data = await getFetchHandler(
      `${__BASE_URL__}/user-latest-tweet?userId=${followingId}`
    );
    setLatestTweet(data);
  };

  useEffect(() => {
    if (!followingId) return;
    getLatestTweet();
  }, []);

  const refreshTweet = () => {
    getLatestTweet();
  };

  return (
    <>
      {latestTweet && (
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
                <UserInfo
                  id={latestTweet.createdBy}
                  createdAt={latestTweet.createdAt}
                />
              </div>
              <div className="tweet-content">
                {latestTweet && <p>{latestTweet.text}</p>}
              </div>
              <div className="tweet-comment d-flex flex-direction-column  ">
                <div
                  className="commentIcon pe-10 p-10"
                  onClick={(e) => handleCommentButton(e)}
                >
                  <ChatBubbleOutlineIcon />{" "}
                  <span className="commentCount">
                    {latestTweet.commentCount}
                  </span>
                </div>
                {showComments && (
                  <div className="comments">
                    <Comments
                      tweetId={latestTweet._id}
                      refreshTweet={refreshTweet}
                    ></Comments>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TweetCard;
