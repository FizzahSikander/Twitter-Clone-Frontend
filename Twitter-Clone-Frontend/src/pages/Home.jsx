import { useEffect, useState } from "react";
import "../components/homePage/home.css";
import TweetForm from "../components/homePage/TweetForm";
import TweetCard from "../components/homePage/TweetCard";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/authentication";

function Home() {
  const [userId, setUserId] = useState();
  const [followings, setFollowings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const validateUser = async () => {
      const getUser = await Auth();
      const getUserId = getUser.id;
      if (!getUserId || getUserId.error) {
        navigate("/login");
        return;
      }
      setUserId(getUserId);
      setFollowings(getUser.following);
    };
    validateUser();
  }, []);

  return (
    <div className="home-container">
      <div className="contents pe-20">
        <TweetForm userId={userId} />
        {followings.map((followingId) => (
          <TweetCard key={followingId} followingId={followingId} />
        ))}
      </div>
      <div className="side-bar">Sidebar</div>
    </div>
  );
}

export default Home;
