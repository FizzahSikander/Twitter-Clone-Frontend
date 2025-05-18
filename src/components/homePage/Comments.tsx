import React from "react";
import CommentForm from "./CommentForm";

function Comments() {
  return (
    <>
      <div className="tweet d-flex comment my-10">
        <div className="user-image text-center">
          <img
            src="https://toihid.com/wp-content/uploads/2025/05/avatar.jpg"
            alt="User Image"
            className="round-image-sm"
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
          </div>
        </div>
      </div>

      <div className="tweet d-flex comment my-10">
        <div className="user-image text-center">
          <img
            src="https://toihid.com/wp-content/uploads/2025/05/avatar.jpg"
            alt="User Image"
            className="round-image-sm"
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
          </div>
        </div>
      </div>

      <div className="comment-form">
        <CommentForm></CommentForm>
      </div>
    </>
  );
}

export default Comments;
