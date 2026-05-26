import { useState } from "react";
import { Button, ImageGrid } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell } from "@/core/types/types";
import { favouriteAction } from "@/core/utils/ImageActions";
import { useUserContext } from "@/hooks/useUserContext";

export const FavouritesView = () => {
  const [active, setActive] = useState<"movie" | "tv">("movie");
  const { favourites, clearfavourites, togglefavourite } = useUserContext();

  const favouriteResults = Array.from(favourites.values())
    .filter((fav) => fav.media === active)
    .map((fav) => ({
      id: fav.id,
      imagePath: fav.imageUrl ?? null,
      primaryText: fav.primaryText ?? "Untitled",
      secondaryText: fav.secondaryText,
    }));

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
        <div className="images-center flex justify-between">
          <h2 className="font-semibold text-gray-300 text-xl">{active === "movie" ? "favourite Movies" : "favourite TV Shows"}</h2>
          {favouriteResults.length > 0 && (
            <Button onClick={() => clearfavourites(active)} variant="red">
              Clear
            </Button>
          )}
        </div>
        <div>
          {favouriteResults.length > 0 ? (
            <ImageGrid onClick={(_id) => clearfavourites(active)} results={favouriteResults}>
              {(image) => (
                <ImageOverlay
                  actions={[
                    favouriteAction(
                      (image: ImageCell) => favourites.has(image.id),
                      () =>
                        togglefavourite({
                          id: image.id,
                          imageUrl: image.imageUrl,
                          media: image.media,
                          primaryText: image.primaryText,
                          secondaryText: image.secondaryText,
                        }),
                      "right",
                    ),
                  ]}
                  image={image}
                />
              )}
            </ImageGrid>
          ) : (
            <p className="col-span-5 text-center text-gray-400">No favourites added yet.</p>
          )}
        </div>
      </section>
    </section>
  );
};
