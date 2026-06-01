import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ImageGrid } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell } from "@/core/types";
import { cartAction, favouriteAction } from "@/core/utils/ImageActions";
import { calculatePrice } from "@/core/utils/pricing";
import { useUserContext } from "@/hooks";

export const FavouritesView = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<"movie" | "tv">("movie");
  const { favourites, purchases, clearFavourites, toggleFavourite, togglePurchase } = useUserContext();

  const favouriteResults = Array.from(favourites.values())
    .filter((fav) => fav.media === active)
    .map((fav) => ({
      id: fav.id,
      imagePath: fav.imageUrl ?? null,
      media: fav.media,
      price: fav.price,
      primaryText: fav.primaryText ?? "Untitled",
      secondaryText: fav.secondaryText,
    }));

  const handleClick = (id: number) => {
    const item = favourites.get(id);
    if (!item) return;
    if (item.media === "movie") navigate(`/movies/${id}/credits`);
    else navigate(`/tv/${id}/seasons`);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-10 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Favourites</h1>
        <div className="flex gap-3">
          <Button onClick={() => setActive("movie")} variant={active === "movie" ? "primary" : "grey"}>
            Movie
          </Button>
          <Button onClick={() => setActive("tv")} variant={active === "tv" ? "primary" : "grey"}>
            TV
          </Button>
        </div>
      </div>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-300 text-xl">{active === "movie" ? "Favourite Movies" : "Favourite TV Shows"}</h2>
          {favouriteResults.length > 0 && (
            <Button onClick={() => clearFavourites(active)} variant="red">
              Clear
            </Button>
          )}
        </div>
        {favouriteResults.length > 0 ? (
          <ImageGrid onClick={handleClick} results={favouriteResults}>
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
                        price: calculatePrice(undefined),
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
        ) : (
          <div className="flex flex-col items-center gap-5 py-10">
            <p className="text-gray-400">No favourites added yet.</p>

            <Button onClick={() => navigate(active === "movie" ? "/movies/category/popular" : "/tv/category/popular")} variant="primary">
              {active === "movie" ? "Explore Movies" : "Explore TV Shows"}
            </Button>
          </div>
        )}
      </section>
    </section>
  );
};
