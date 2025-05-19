import '../components/homePage/home.css';
import Tweet from '../components/homePage/Tweet';
import TweetCard from '../components/homePage/TweetCard';

function Home() {
  return (
    <>
      <div className='home-container'>
        {/*userId*/}
        <div className='contents pe-20'>
          <Tweet />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
        </div>
        <div className='side-bar'>Sidebar</div>
      </div>
    </>
  );
}

export default Home;
