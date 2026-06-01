import { useState } from "react";
import { FaCog, FaRegHeart, FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Link, SearchBar } from "@/components";
import { ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks/useUserContext";

export const Header = () => {
  const navigate = useNavigate();
  const { favourites, purchases, userName } = useUserContext();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("movie");

  const getHeaderColor = () => {
    return "bg-gray-900";
  };

  return (
    <header className="border-gray-700 border-b">
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
      <div className="flex items-center justify-between bg-gray-900">
        <h1 className="ml-4 font-bold text-3xl text-white tracking-tight"> Welcome, {userName}</h1>
        <div className="flex items-center gap-2">
          <button className="relative cursor-pointer rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favourites")}>
            <FaRegHeart size={ICON_SIZE} />
            {favourites.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {favourites.size}
              </span>
            )}
          </button>
          <button className="relative cursor-pointer rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/cart")}>
            <IoCartOutline size={ICON_SIZE} />
            {purchases.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {purchases.size}
              </span>
            )}
          </button>
          <button className="relative cursor-pointer rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
            <FaCog size={ICON_SIZE} />
          </button>
        </div>
      </div>
    </header>
  );
};
