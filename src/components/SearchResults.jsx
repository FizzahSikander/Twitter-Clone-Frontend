import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFetchHandler } from '../utils/FetchHandler.jsx';
import { Link } from 'react-router-dom';
import { FormatInfo } from '../utils/Formatter.jsx';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { DEFAULT_IMG } from '../utils/Formatter.jsx';
import Navbar from './Navbar';

export function SearchResults() {
  const [user, setUser] = useState([]);
  const [results, setResults] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    setUser([]);
    setResults([]);

    const run = async () => {
      const data = await getFetchHandler(`${__BASE_URL__}/search?q=${encodeURIComponent(query)}`);

      if (data.type === 'user') {
        setUser(data?.results || []);
      } else {
        setResults(data?.results || []);
      }
    };

    run();
  }, [query]);

  console.log(user);
  return (
    <>
      <div className='home-container search-tweets'>
        <Navbar />
        <div className='contents pe-20 tweet-search'>
          {results.map((tweet) => (
            <div className='tweet d-flex' key={tweet._id}>
              <div className='user-image text-center'>
                <Link to={`/profile/${tweet.createdBy?.nickname || 'Unknown'}`}>
                  <img
                    src={tweet.createdBy?.image || DEFAULT_IMG}
                    alt='User Image'
                    className='round-image'
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </div>

              <div className='tweet-form'>
                <div className='d-flex flex-direction-column'>
                  <FormatInfo tweet={tweet} />
                  <div className='tweet-content'>
                    {tweet && <p>{tweet.text}</p>}

                    <ChatBubbleOutlineIcon />
                    <span className='commentCount'>{tweet.comments.length}</span>
                  </div>
                </div>
              </div>

              {console.log(JSON.stringify(tweet, null, 2))}
            </div>
          ))}

          {user.map((u) => (
            <div className='tweet d-flex' key={u._id}>
              <div className='footer-container search-user'>
                <img
                  src={u.image}
                  alt='avatar'
                  onClick={() => navigate(`/profile/${u.nickname}`)}
                />
                <div style={{ flex: 1 }}>
                  <div className='footer-name'>{u.name}</div>
                  <div className='footer-handle' onClick={() => navigate(`/profile/${u.nickname}`)}>
                    @{u.nickname}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* {
  <div className='home-container'>
    <div className='tweet d-flex'>
      <div className='user-image text-center'>
        <img src={tweet.createdBy.image} alt='User Image' className='round-image' />
      </div>

      <div className='tweet-form'>
        <div className='d-flex flex-direction-column'>
          <div className='tweet-heading'>
            {tweet.createdBy.name}
            <UserInfo id={tweet.createdBy} createdAt={tweet.createdAt} />
          </div>
          <div className='tweet-content'>{tweet && <p>{tweet.text}</p>}</div>
          <div className='tweet-comment d-flex flex-direction-column  '>
            <div className='commentIcon pe-10 p-10' onClick={(e) => handleCommentButton(e)}></div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
 */
