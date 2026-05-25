import { createContext } from "react";
import type { ImageCell } from "@/core/types/components";

export type UserContextType = {
  userName: string;
  purchases: Map<number, ImageCell>;
  favourites: Map<number, ImageCell>;
  genres: string[];
  setUserName: (userName: string) => void;
  togglefavourite: (image: ImageCell) => void;
  togglePurchase: (image: ImageCell) => void;
  clearfavourites: (media: "movie" | "tv") => void;
  toggleGenre: (genre: string) => void;
  clearPurchases: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
