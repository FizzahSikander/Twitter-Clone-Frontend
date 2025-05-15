import React from "react";

function CommentForm() {
  return (
    <div>
      <form className="d-flex flex-direction-column">
        <textarea
          rows="7"
          cols="50"
          className="tweet-text"
          placeholder="Write your thought ..."
        />
        <input
          type="submit"
          value="Save"
          className="save-tweet align-self-end"
        />
      </form>
    </div>
  );
}

export default CommentForm;
