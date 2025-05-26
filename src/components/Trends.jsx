import { useNavigate } from "react-router-dom";

export const Trends = ({ tags }) => {
  const navigate = useNavigate();

  return (
    <>
      {tags.map((tag) => (
        <div
          className="trend-row"
          key={tag._id}
          onClick={() => navigate(`/search?q=%23${tag._id}`)}
        >
          <div>
            <span className="trend-meta">Trending in Sweden</span>
            <div className="trend-title">
              {tag._id} <span className="trend-count"> {tag.count}</span>
            </div>
          </div>
          <div className="dots">•••</div>
        </div>
      ))}
    </>
  );
};
