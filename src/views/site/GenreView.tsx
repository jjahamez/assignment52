import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { GENRE_ENDPOINT } from "@/core/constants";
import type { GenreResponse } from "@/core/types";
import { useTmdb } from "@/hooks";

const MOVIE_GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 80, name: "Crime" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 878, name: "Sci-Fi" },
];

const TV_GENRES = [
  { id: 10759, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10765, name: "Sci-Fi" },
];

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType, genre } = useParams();
  const [page, setPage] = useState<number>(1);

  const genres = mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;
  const genreId = genres.find((item) => item.name.toLowerCase() === genre)?.id;

  const { data } = useTmdb<GenreResponse>(`${GENRE_ENDPOINT}/${mediaType}`, { page, with_genres: genreId }, [mediaType, genreId, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title ?? result.name ?? "",
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-green-950/90">
      <section className="mx-auto max-w-[1200px] space-y-5 p-5">
        <LinkGroup
          options={[
            { label: "Movies", match: "/genre/movie/:genre", to: `/genre/movie/action` },
            { label: "TV", match: "/genre/tv/:genre", to: `/genre/tv/action` },
          ]}
        />
        <LinkGroup
          options={genres.map((item) => ({
            label: item.name,
            to: `/genre/${mediaType}/${item.name.toLowerCase()}`,
          }))}
        />
        <ImageGrid
          onClick={(id) => (mediaType === "movie" ? navigate(`/movies/${id}/credits`) : navigate(`/tv/${id}/seasons`))}
          results={gridData}
        />
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
