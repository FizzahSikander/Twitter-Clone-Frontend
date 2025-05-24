import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trends } from './Trends';
import { getTags } from '../services/actions';

export function SideBar() {
  const [trends, setTrends] = useState();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      const trending = await getTags();
      setTrends(trending);
    };
    data();
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    const timeout = setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, navigate]);

  if (!trends) return null;

  return (
    <div className='trends-wrapper'>
      <input
        className='search-input'
        type='text'
        placeholder='Search Twitter'
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='trends-card'>
        <h2 className='trends-header'>Trends for you</h2>
        <Trends tags={trends} />
      </div>
    </div>
  );
}
