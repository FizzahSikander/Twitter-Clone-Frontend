import { useEffect, useState } from "react";
import "../components/homePage/home.css";
import Tweet from "../components/homePage/Tweet";
import TweetCard from "../components/homePage/TweetCard";
import { useNavigate } from "react-router-dom";
import { Auth } from "../services/authentication";

function Home() {
  const [userId, setUserId] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const validateUser = async () => {
      const getUserId = await Auth();
      if (!getUserId || getUserId.error) {
        navigate("/login");
        return;
      }
      setUserId(getUserId);
    };
    validateUser();
  }, []);

  return (
    <div className="home-container">
      {/*userId*/}
      <div className="contents pe-20">
        <Tweet />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
      </div>
      <div className="side-bar">Sidebar</div>
    </div>
  );
}

export default Home;
