import { BsCart2, BsCartFill } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ICON_SIZE, type ImageAction, type ImageCell } from "@/core";

export const favouriteAction = (
  isfavourite: (image: ImageCell) => boolean,
  onTogglefavourite: (image: ImageCell) => void,
  pos: "left" | "right",
): ImageAction => ({
  active: isfavourite,
  icon: (active) =>
    active ? <FaHeart className="text-blue-500" size={ICON_SIZE} /> : <FaRegHeart className="text-white" size={ICON_SIZE} />,
  id: "favourite",
  onClick: onTogglefavourite,
  position: pos,
});

export const cartAction = (
  isInCart: (image: ImageCell) => boolean,
  onToggleCart: (image: ImageCell) => void,
  pos: "left" | "right",
): ImageAction => ({
  active: isInCart,
  icon: (active) =>
    active ? <BsCartFill className="text-blue-500" size={ICON_SIZE} /> : <BsCart2 className="text-white" size={ICON_SIZE} />,
  id: "cart",
  onClick: onToggleCart,
  position: pos,
});
