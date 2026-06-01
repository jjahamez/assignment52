import { useNavigate, useParams } from "react-router-dom";
import { ImageGrid } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import { TV_ENDPOINT } from "@/core/constants";
import type { ImageCell, SeasonsResponse } from "@/core/types";
import { cartAction, favouriteAction } from "@/core/utils/ImageActions";
import { calculatePrice } from "@/core/utils/pricing";
import { useTmdb, useUserContext } from "@/hooks";

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);
  const { favourites, purchases, togglefavourite, togglePurchase } = useUserContext();

  const gridData = (data?.seasons ?? []).map((result) => ({
    id: result.season_number,
    imagePath: result.poster_path,
    primaryText: result.name,
    secondaryText: result.air_date,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2">
      <h2 className="mb-6 font-bold text-2xl">Seasons</h2>
      {data.seasons.length ? (
        <ImageGrid onClick={(number) => navigate(`/tv/${id}/season/${number}`)} results={gridData}>
          {(image: ImageCell) => (
            <ImageOverlay
              actions={[
                favouriteAction(
                  (img: ImageCell) => favourites.has(img.id),
                  (img: ImageCell) => {
                    if (purchases.has(img.id))
                      togglePurchase({ id: img.id, imageUrl: img.imageUrl, media: "tv", primaryText: img.primaryText });
                    togglefavourite({
                      id: img.id,
                      imageUrl: img.imageUrl,
                      media: "tv",
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
                      togglefavourite({ id: img.id, imageUrl: img.imageUrl, media: "tv", primaryText: img.primaryText });
                    togglePurchase({
                      id: img.id,
                      imageUrl: img.imageUrl,
                      media: "tv",
                      price: calculatePrice(img.secondaryText),
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
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};
