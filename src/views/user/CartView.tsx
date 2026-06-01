import { useNavigate } from "react-router-dom";
import { Button, ImageGrid } from "@/components";
import { ImageOverlay } from "@/components/controls/images/ImageOverlay";
import type { ImageCell } from "@/core/types";
import { favouriteAction } from "@/core/utils/ImageActions";
import { formatPrice } from "@/core/utils/pricing";
import { useUserContext } from "@/hooks";

export const CartView = () => {
  const navigate = useNavigate();
  const { purchases, favourites, clearPurchases, togglefavourite, togglePurchase } = useUserContext();

  const cartItems = Array.from(purchases.values());
 
  const total = cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
 
  const gridData = cartItems.map((item) => ({
    id: item.id,
    imagePath: item.imageUrl ?? null,
    primaryText: item.primaryText ?? "Untitled",
    secondaryText: item.price !== undefined ? formatPrice(item.price) : undefined,
  }));

   return (
    <section className="mx-auto max-w-7xl space-y-10 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Cart</h1>
        {cartItems.length > 0 && (
          <Button onClick={() => clearPurchases()} variant="red">
            Clear
          </Button>
        )}
      </div>
 
      {cartItems.length > 0 ? (
        <>
          <ImageGrid results={gridData}>
            {(image: ImageCell) => (
              <ImageOverlay
                actions={[
                  favouriteAction(
                    (img: ImageCell) => favourites.has(img.id),
                    (img: ImageCell) => {
                      togglePurchase({ id: img.id, imageUrl: img.imageUrl, media: img.media, primaryText: img.primaryText });
                      togglefavourite({ id: img.id, imageUrl: img.imageUrl, media: img.media, primaryText: img.primaryText, secondaryText: img.secondaryText });
                    },
                    "right",
                  ),
                  {
                    id: "remove",
                    position: "left",
                    active: () => false,
                    icon: () => <span className="font-bold text-white text-xs">✕</span>,
                    onClick: (img: ImageCell) => togglePurchase({ id: img.id, imageUrl: img.imageUrl, media: img.media, primaryText: img.primaryText }),
                  },
                ]}
                image={image}
              />
            )}
          </ImageGrid>
 
          <div className="flex justify-end rounded-xl bg-gray-800 p-5">
            <div className="space-y-1 text-right">
              <p className="text-gray-400 text-sm">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
              <p className="font-bold text-2xl">Total: {formatPrice(total)}</p>
              <Button onClick={() => {}} variant="primary">
                Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5 py-10">
          <p className="text-gray-400">Your cart is empty.</p>
          <Button onClick={() => navigate("/movies/category/popular")} variant="primary">
            Explore Movies
          </Button>
        </div>
      )}
    </section>
  );
};