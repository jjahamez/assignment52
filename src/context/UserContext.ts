import type { ImageCell } from "@/core/types/components";
import { createContext } from "react";

export type UserContextType = {
    userName: string;
    purchases: Map<number, ImageCell>;
  favorites: Map<number, ImageCell>;
  genres: string[];
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
  togglePurchase: (image: ImageCell) => void;
  clearFavorites: (media: "movie" | "tv") => void;
  toggleGenre: (genre: string) => void;
clearPurchases: () => void;

};

export const UserContext = createContext<UserContextType | undefined>(undefined);
