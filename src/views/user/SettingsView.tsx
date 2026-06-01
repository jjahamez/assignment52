import { useState } from "react";
import { Button } from "@/components";
import { useUserContext } from "@/hooks";

const MOVIE_GENRES = ["Action", "Adventure", "Animation", "Crime", "Family", "Fantasy", "Horror", "Mystery", "Sci-Fi"];
const TV_GENRES = ["Action", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Kids", "Mystery", "Sci-Fi"];

export const SettingsView = () => {
  const { userName, setUserName, movieGenres, tvGenres, toggleMovieGenre, toggleTvGenre } = useUserContext();
  const [nameInput, setNameInput] = useState(userName);

  const handleSave = () => {
    if (nameInput.trim()) setUserName(nameInput.trim());
  };

  return (
    <section className="mx-auto max-w-2xl space-y-10 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>

      <div className="space-y-3 rounded-xl bg-gray-800 p-5">
        <h2 className="font-semibold text-xl">Username</h2>
        <div className="flex gap-3">
          <input
            className="flex-1 rounded-md bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter username"
            type="text"
            value={nameInput}
          />
          <Button onClick={handleSave} variant="primary">
            Save
          </Button>
        </div>
        <p className="text-gray-400 text-sm">Current: {userName}</p>
      </div>

      <div className="space-y-3 rounded-xl bg-gray-800 p-5">
        <h2 className="font-semibold text-xl">Movie Genre Preferences</h2>
        <p className="text-gray-400 text-xs">If all are deselected, all genres will be shown.</p>
        <div className="flex flex-wrap gap-2">
          {MOVIE_GENRES.map((genre) => (
            <button
              className={`rounded-full border px-4 py-1 text-sm transition ${
                movieGenres.includes(genre) ? "border-blue-500 bg-blue-500 text-white" : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-400"
              }`}
              key={genre}
              onClick={() => toggleMovieGenre(genre)}
              type="button"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-xl bg-gray-800 p-5">
        <h2 className="font-semibold text-xl">TV Genre Preferences</h2>
        <p className="text-gray-400 text-xs">If all are deselected, all genres will be shown.</p>
        <div className="flex flex-wrap gap-2">
          {TV_GENRES.map((genre) => (
            <button
              className={`rounded-full border px-4 py-1 text-sm transition ${
                tvGenres.includes(genre) ? "border-blue-500 bg-blue-500 text-white" : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-400"
              }`}
              key={genre}
              onClick={() => toggleTvGenre(genre)}
              type="button"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};