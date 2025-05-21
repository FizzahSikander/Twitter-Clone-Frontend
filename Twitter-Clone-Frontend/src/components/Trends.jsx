import { useNavigate } from 'react-router-dom';

export const Trends = ({ tags }) => {
  const navigate = useNavigate();

  return (
    <>
      {tags.map((tag) => (
        <div className='trend-row' key={tag._id}>
          <div>
            <span className='trend-meta'>Trending in Sweden</span>
            <div className='trend-title' onClick={() => navigate(`/search?q=%23${tag._id}`)}>
              {tag._id}
            </div>

            <div className='trend-count'>{tag.count}</div>
          </div>
          <div className='dots'>•••</div>
        </div>
      ))}
    </>
  );
};
