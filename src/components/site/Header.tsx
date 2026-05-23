import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonGroup, Link, SearchBar } from "@/components";

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("movie");

  const getHeaderColor = () => {
    if (pathname.startsWith("/movies")) return "bg-gray-900";
    if (pathname.startsWith("/tv")) return "bg-stone-800";
    if (pathname.startsWith("/trending")) return "bg-slate-800";
    if (pathname.startsWith("/genre")) return "bg-green-950";
    if (pathname.startsWith("/search")) return "bg-zinc-800";
    if (pathname.startsWith("/person")) return "bg-neutral-800";
    return "bg-gray-900";
  };

  return (
    <header>
      <nav className={`flex flex-wrap items-center gap-4 p-4 transition-colors duration-300 ${getHeaderColor()}`}>
        <h1 className="shrink-0 font-bold text-2xl text-white">TMDB Browser</h1>
        <div className="flex flex-wrap gap-2">
          <Link match={"/movies/category/:category"} to="/movies/category/popular">
            Movies
          </Link>
          <Link match={"/tv/category/:category"} to="/tv/category/airing_today">
            TV
          </Link>
          <Link match={"/trending/:category"} to="/trending/movies">
            Trending
          </Link>
          <Link match={"/genre/:mediaType/:genre"} to="/genre/movie/action">
            Genre
          </Link>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <FaSearch className="text-gray-000" />
          <SearchBar
            onChange={(input) => {
              setQuery(input);
              navigate(`/search?q=${input}&type=${type}`);
            }}
            value={query}
          />
          <ButtonGroup
            onClick={(newType) => {
              setType(newType);
              navigate(`/search?q=${query}&type=${newType}`);
            }}
            options={[
              { label: "Movies", value: "movie" },
              { label: "TV", value: "tv" },
              { label: "Person", value: "person" },
            ]}
            value={type}
          />
        </div>
      </nav>
    </header>
  );
};
