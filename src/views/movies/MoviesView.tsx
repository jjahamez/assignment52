import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { MOVIE_ENDPOINT } from "@/core/constants";
import type { ImageCell, MoviesResponse } from "@/core/types";
import { useTmdb, useUserContext } from "@/hooks";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import { favoriteAction } from "@/core/utils/ImageActions";

export const MoviesView = () => {
  const navigate = useNavigate();
  const {favorites, toggleFavorite} = useUserContext();
  const [page, setPage] = useState<number>(1);
  const { category } = useParams();
  const { data } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [category, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.title ?? result.original_title,
    secondaryText: `⭐ ${result.vote_average.toFixed(1)}`,
    media: "movie",
  }));

  useEffect(() => {
    setPage(1);
  }, []);

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900/90">
      <section className="mx-auto max-w-[1200px] space-y-5 p-5">
        <LinkGroup
          options={[
            { label: "Popular", to: "/movies/category/popular" },
            { label: "Now Playing", to: "/movies/category/now_playing" },
            { label: "Top Rated", to: "/movies/category/top_rated" },
            { label: "Upcoming", to: "/movies/category/upcoming" },
          ]}
        />
        <ImageGrid onClick={(id) => navigate(`/movies/${id}/credits`)} results={gridData}>
           {(image: ImageCell) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), ()=>toggleFavorite({id: image.id, media: "movie", imageUrl: image.imageUrl, primaryText: image.primaryText, secondaryText: image.secondaryText}), "right")]} image={image}/>
        )}
        </ImageGrid>
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
