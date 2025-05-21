import { Link } from 'react-router-dom';
import { getTimeAgo } from '../services/tweet';

export const DEFAULT_IMG =
  'https://res.cloudinary.com/dsr0s5lbq/image/upload/v1743707427/j8ry5tkeqmdhyoxp3nrc.jpg';

export const FormatInfo = ({ tweet }) => {
  return (
    <div className='tweet-heading'>
      <Link to={`/profile/${tweet.createdBy?.nickname || 'Unknown'}`} className='profile-link'>
        <b>{tweet.createdBy?.name || 'Unknown'} </b>
      </Link>
      <Link to={`/profile/${tweet.createdBy?.nickname || 'Unknown'}`} className='profile-link'>
        @{tweet.createdBy?.nickname || 'Unknown'}
      </Link>
      {' - '}
      {getTimeAgo(tweet.createdAt)}
    </div>
  );
};

export function FormatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
