import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { FAVORITES_KEY, GENRES_KEY, PURCHASES_KEY, USERNAME_KEY, type ImageCell } from "@/core";
import  { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [purchases, setPurchases] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(PURCHASES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [genres, setGenres] = useLocalStorage<string[], string[]>(GENRES_KEY, []);

  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
  };

  const togglePurchase = (image: ImageCell) => {
    setPurchases((prev) => {
      const cloned = new Map(prev);

      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
      }

      return cloned;
    });
  };

  const clearFavorites = (media: "movie" | "tv") => {
    setFavorites((prev) => {
      const cloned = new Map(prev);
      for (const [id, image] of cloned.entries()) {
        if (image.media === media) {
          cloned.delete(id);
        }
      }
      return cloned;
    });
  }
  const clearPurchases = () => {
    setPurchases(new Map());
  }

  const toggleGenre = (genre: string) => {
    setGenres((prev) => {
      const cloned = [...prev];
      const index = cloned.indexOf(genre);
      if (index === -1) {
        cloned.push(genre);
      } else {
        cloned.splice(index, 1);
      }
      return cloned;
    });
  }

return (
    <UserContext.Provider
      value={{
        favorites,
        setUserName,
        toggleFavorite,
        userName,
        purchases,
        togglePurchase,
        clearFavorites,
        toggleGenre,
        genres,
        clearPurchases
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
