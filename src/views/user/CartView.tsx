import { useNavigate } from "react";
import { Button, ImageGrid } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell } from "@/core/types/types";
import { favouriteAction } from "@/core/utils/ImageActions";

export const CartView = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<"movie" | "tv">("movie");
  const { favourites, clearfavourites, togglefavourite } = useUserContext();

  return <section>
    {cart.length > 0 ? (
      <div className="images-center flex justify-between">
        <h2 className="font-semibold text-gray-300 text-xl">Cart</h2>
        <Button onClick={() => clearCart()} variant="red">
          Clear
        </Button>
      </div>
      <ImageGrid onClick={(_id) => clearCart()} results={cart}>
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
    ) else {
      <div className="flex flex-col items-center gap-5 py-10">
        <p className="text-gray-400">Your cart is empty.</p>
        <Button onClick={() => navigate("/movies/category/popular")} variant="primary">
          Explore Movies
        </Button>
      </div>
    }
  </section>;
};
