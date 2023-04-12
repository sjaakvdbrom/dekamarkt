export const useCart = () => useState("cart", () => []);
export const useCartTotal = () => useState("cart-total", () => 0);
export const useCartOffcanvas = () => useState("cart-offcanvas", () => false);
