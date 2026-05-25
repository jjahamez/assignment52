import type { ReactNode } from "react";
import { UserContext } from "@/context";
import { FAVOURITES_KEY, GENRES_KEY, type ImageCell, PURCHASES_KEY, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favourites, setfavourites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVOURITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [purchases, setPurchases] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(PURCHASES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  const [genres, setGenres] = useLocalStorage<string[], string[]>(GENRES_KEY, []);

  const togglefavourite = (image: ImageCell) => {
    setfavourites((prev) => {
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

  const clearfavourites = (media: "movie" | "tv") => {
    setfavourites((prev) => {
      const cloned = new Map(prev);
      for (const [id, image] of cloned.entries()) {
        if (image.media === media) {
          cloned.delete(id);
        }
      }
      return cloned;
    });
  };
  const clearPurchases = () => {
    setPurchases(new Map());
  };

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
  };

  return (
    <UserContext.Provider
      value={{
        clearfavourites,
        clearPurchases,
        favourites,
        genres,
        purchases,
        setUserName,
        togglefavourite,
        toggleGenre,
        togglePurchase,
        userName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
