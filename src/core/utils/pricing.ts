const BASE_PRICE = 19.99;
const MIN_PRICE = 4.99;

export const calculatePrice = (dateString?: string): number => {
  if (!dateString) return MIN_PRICE;
  const year = new Date(dateString).getFullYear();
  const age = new Date().getFullYear() - year;
  return Math.max(MIN_PRICE, BASE_PRICE - age);
};

export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;
