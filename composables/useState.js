export const useProducts = () => useState("api-products", () => []);
export const useOriginalProducts = () => useState("api-original-products", () => []);
export const useBrands = () => useState("api-brands", () => []);
export const useCart = () => useState("cart", () => []);
export const useCartTotal = () => useState("cart-total", () => 0);
