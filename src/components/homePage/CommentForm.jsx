import { useEffect, useState } from 'react';
import { Auth } from '../../services/authentication';
import { addComment } from '../../services/tweet';
import { useUser } from '../../utils/UserContext';

function CommentForm({ tweetId, refreshContents }) {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();

  const { user } = useUser();

  if (!user) return null;

  const [form, setForm] = useState({
    text: '',
    authorId: '',
  });

  const handleText = (val) => {
    setForm({ ...form, text: val, tweetId: tweetId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text) return setError('Missing fields');
    setError('');
    setMessage('');
    const res = await addComment(form);
    form.text = '';
    if (res.message) {
      setMessage(res.message);
      refreshContents();
    } else {
      setError(res.error);
    }
  };

  return (
    <div>
      <form className='d-flex flex-direction-column' onSubmit={handleSubmit}>
        <textarea
          rows='7'
          cols='50'
          className='tweet-text'
          placeholder='Write your thought ...'
          value={form.text}
          onChange={(e) => handleText(e.target.value)}
        />
        <input type='submit' value='Save' className='save-tweet align-self-end' />
      </form>
    </div>
  );
}

export default CommentForm;
