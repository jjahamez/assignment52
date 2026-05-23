import { Button, ImageGrid } from "@/components"
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell } from "@/core/types/types";
import { favoriteAction } from "@/core/utils/ImageActions";
import { useUserContext } from "@/hooks/useUserContext";
import { useState } from "react";

export const FavoritesView = () => {
    const [active, setActive] = useState<"movie" | "tv">("movie");
    const { favorites, clearFavorites, toggleFavorite } = useUserContext();

    const favoriteResults = Array.from(favorites.values())
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
            <h1 className="text-3xl font-bold">Favorites</h1>
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
                <h2 className="font-semibold text-gray-300 text-xl">{active === "movie" ? "Favorite Movies" : "Favorite TV Shows"}</h2>
                {favoriteResults.length > 0 && (
                    <Button onClick={() => clearFavorites(active)} variant="red">
                        Clear
                    </Button>
                )}
            </div>
            <div>
                {favoriteResults.length > 0 ? (
                    <ImageGrid results={favoriteResults} onClick={(id)=>}>
                         {(image) => (
          <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), ()=>toggleFavorite({id: image.id, media: image.media, imageUrl: image.imageUrl, primaryText: image.primaryText, secondaryText: image.secondaryText}), "right")]} image={image} />
        )}
                    </ImageGrid>
                ) : (
                    <p className="col-span-5 text-center text-gray-400">No favorites added yet.</p>
                )}
            </div>
        </section>
    </section>
  )}