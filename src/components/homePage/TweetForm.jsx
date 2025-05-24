import { useState, useEffect } from 'react';
import { createTweet } from '../../services/tweet';

function TweetForm({ userId }) {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    text: '',
    tags: '',
    comments: [],
    createdBy: '',
  });

  // get tags
  const extractTags = (text) => {
    const tags = text.match(/#[\p{L}\p{N}_]+/gu);
    return tags ? tags.map((tag) => tag.slice(1)) : [];
  };

  // handle text input
  const handleText = (val) => {
    const tags = extractTags(val);
    setForm({ ...form, text: val, tags: tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.text) return setError('Missing fields');
    setError('');
    setMessage('');
    if (!userId) return setError('User is not valid');
    const res = await createTweet(form);
    form.text = '';
    res.message ? setMessage(res.message) : setError(res.error);
  };

  // One for syncing userId to form
  useEffect(() => {
    if (userId) {
      setForm((prev) => ({ ...prev, createdBy: userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {message && <div className='display-message'> {message} </div>}
      <div className='tweet d-flex'>
        <div className='user-image text-center'>
          <img
            src='https://toihid.com/wp-content/uploads/2025/05/avatar.jpg'
            alt='User Image'
            className='round-image'
          />
        </div>
        <div className='tweet-form'>
          <form className='d-flex flex-direction-column' onSubmit={handleSubmit}>
            <textarea
              rows='7'
              cols='50'
              className='tweet-text'
              placeholder="What's happening..."
              value={form.text}
              onChange={(e) => handleText(e.target.value)}
            />
            <input type='submit' value='Tweet' className='save-tweet align-self-end' />
          </form>
        </div>
      </div>
    </>
  );
}

export default TweetForm;
