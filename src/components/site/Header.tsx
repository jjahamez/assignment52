import { ButtonGroup, Link, SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>('movie');

  const getHeaderColor = () => {
    if (pathname.startsWith('/movies')) return 'bg-gray-900';
    if (pathname.startsWith('/tv')) return 'bg-stone-800';
    if (pathname.startsWith('/trending')) return 'bg-slate-800';
    if (pathname.startsWith('/genre')) return 'bg-green-950';
    if (pathname.startsWith('/search')) return 'bg-zinc-800';
    if (pathname.startsWith('/person')) return 'bg-neutral-800';
    return 'bg-gray-900';
  };

  return (
    <header>
      <nav className={`flex items-center gap-4 p-4 flex-wrap transition-colors duration-300 ${getHeaderColor()}`}>
        <h1 className="text-2xl font-bold text-white shrink-0">TMDB Browser</h1>
        <div className="flex gap-2 flex-wrap">
          <Link to="/movies/category/popular" match={'/movies/category/:category'}>Movies</Link>
          <Link to="/tv/category/airing_today" match={'/tv/category/:category'}>TV</Link>
          <Link to="/trending/movies" match={'/trending/:category'}>Trending</Link>
          <Link to="/genre/movie/action" match={'/genre/:mediaType/:genre'}>Genre</Link>
        </div>
        <div className="flex items-center gap-3 ml-auto flex-wrap">
          <FaSearch className="text-gray-000" />
          <SearchBar
            value={query}
            onChange={(input) => {
              setQuery(input);
              navigate(`/search?q=${input}&type=${type}`);
            }}
          />
          <ButtonGroup
            value={type}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(newType) => {
              setType(newType);
              navigate(`/search?q=${query}&type=${newType}`);
            }}
          />
        </div>
      </nav>
    </header>
  );
};