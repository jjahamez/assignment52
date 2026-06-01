import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid, LinkGroup, Pagination } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import { GENRE_ENDPOINT } from "@/core/constants";
import type { GenreResponse, ImageCell } from "@/core/types";
import { cartAction, favouriteAction } from "@/core/utils/ImageActions";
import { calculatePrice } from "@/core/utils/pricing";
import { useTmdb, useUserContext } from "@/hooks";

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
  const { favourites, purchases, movieGenres, tvGenres, toggleFavourite, togglePurchase } = useUserContext();

  const allGenres = mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;
  const activePrefs = mediaType === "tv" ? tvGenres : movieGenres;

  const visibleGenres = activePrefs.length > 0 ? allGenres.filter((g) => activePrefs.includes(g.name)) : allGenres;

  const genreId = allGenres.find((item) => item.name.toLowerCase() === genre)?.id;

  const { data } = useTmdb<GenreResponse>(`${GENRE_ENDPOINT}/${mediaType}`, { page, with_genres: genreId }, [mediaType, genreId, page]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    media: mediaType as "movie" | "tv",
    price: calculatePrice(undefined),
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
    <div className="min-h-screen bg-gray-900">
      <section className="mx-auto max-w-[1200px] space-y-5 p-5">
        <LinkGroup
          options={[
            { label: "Movies", match: "/genre/movie/:genre", to: "/genre/movie/action" },
            { label: "TV", match: "/genre/tv/:genre", to: "/genre/tv/action" },
          ]}
        />
        {visibleGenres.length > 0 ? (
          <LinkGroup
            options={visibleGenres.map((item) => ({
              label: item.name,
              to: `/genre/${mediaType}/${item.name.toLowerCase()}`,
            }))}
          />
        ) : (
          <p className="text-gray-400 text-sm">No genres enabled. Enable some in Settings.</p>
        )}
        <ImageGrid
          onClick={(id) => (mediaType === "movie" ? navigate(`/movies/${id}/credits`) : navigate(`/tv/${id}/seasons`))}
          results={gridData}
        >
          {(image: ImageCell) => (
            <ImageOverlay
              actions={[
                favouriteAction(
                  (img: ImageCell) => favourites.has(img.id),
                  (img: ImageCell) => {
                    if (purchases.has(img.id))
                      togglePurchase({ id: img.id, imageUrl: img.imageUrl, media: img.media, primaryText: img.primaryText });
                    toggleFavourite({
                      id: img.id,
                      imageUrl: img.imageUrl,
                      media: img.media,
                      primaryText: img.primaryText,
                      secondaryText: img.secondaryText,
                    });
                  },
                  "right",
                ),
                cartAction(
                  (img: ImageCell) => purchases.has(img.id),
                  (img: ImageCell) => {
                    if (favourites.has(img.id))
                      toggleFavourite({ id: img.id, imageUrl: img.imageUrl, media: img.media, primaryText: img.primaryText });
                    togglePurchase({
                      id: img.id,
                      imageUrl: img.imageUrl,
                      media: img.media,
                      price: img.price,
                      primaryText: img.primaryText,
                    });
                  },
                  "left",
                ),
              ]}
              image={image}
            />
          )}
        </ImageGrid>
        <Pagination maxPages={data.total_pages} onClick={setPage} page={page} />
      </section>
    </div>
  );
};
