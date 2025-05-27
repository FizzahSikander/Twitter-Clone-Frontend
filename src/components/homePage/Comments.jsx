import { useState, useEffect } from "react";
import { getFetchHandler } from "../../utils/FetchHandler";
import CommentForm from "./CommentForm";
import UserInfo from "./UserInfo";
import UserImg from "./UserImg";

function Comments({ tweetId, refreshTweet }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const comments = await getFetchHandler(
      `${__BASE_URL__}/comments?tweetId=${tweetId}`
    );

    setComments(comments);
  };

  useEffect(() => {
    if (!tweetId) return;
    getComments();
  }, []);

  const refreshContents = () => {
    getComments();
    refreshTweet();
  };

  return (
    <>
      {comments.length != 0 &&
        comments.map((comment) => {
          return (
            <div key={comment._id} className="tweet d-flex comment my-10">
              <div className="user-image text-center">
                <UserImg id={comment.createdBy._id} />
              </div>
              <div className="tweet-form">
                <div className="d-flex flex-direction-column">
                  <div className="tweet-heading">
                    <UserInfo
                      id={comment.createdBy._id}
                      createdAt={comment.createdAt}
                    />
                  </div>
                  <div className="tweet-content">{comment.text}</div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="comment-form">
        <CommentForm
          tweetId={tweetId}
          refreshContents={refreshContents}
        ></CommentForm>
      </div>
    </>
  );
}

export default Comments;
