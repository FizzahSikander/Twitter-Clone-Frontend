import { useEffect, useState } from "react";
import { Auth } from "../../services/authentication";
import { addComment } from "../../services/tweet";

function CommentForm({ tweetId, refreshContents }) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState();

  const [form, setForm] = useState({
    text: "",
    authorId: "",
  });

  const handleText = (val) => {
    setForm({ ...form, text: val, authorId: userId, tweetId: tweetId });
  };

  useEffect(() => {
    const validateUser = async () => {
      const getUser = await Auth();
      const getUserId = getUser.id;
      if (!getUserId || getUserId.error) {
        navigate("/login");
        return;
      }
      setUserId(getUserId);
    };
    validateUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text) return setError("Missing fields");
    setError("");
    setMessage("");
    if (!userId) return setError("User is not valid");
    const res = await addComment(form);
    form.text = "";
    if (res.message) {
      setMessage(res.message);
      refreshContents();
    } else {
      setError(res.error);
    }
  };

  return (
    <div>
      <form className="d-flex flex-direction-column" onSubmit={handleSubmit}>
        <textarea
          rows="7"
          cols="50"
          className="tweet-text"
          placeholder="Write your thought ..."
          value={form.text}
          onChange={(e) => handleText(e.target.value)}
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
