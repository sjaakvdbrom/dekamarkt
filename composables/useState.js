export const useProducts = () => useState("api-products", () => []);
export const useOriginalProducts = () => useState("api-original-products", () => []);
export const useBrands = () => useState("api-brands", () => []);
export const useCurrentPage = () => useState("current-product-page", () => 1);
export const usePerPage = () => useState("products-per-page", () => 16);
export const useFiltering = () => useState("filtering", () => false);
export const useCart = () => useState("cart", () => []);
export const useCartTotal = () => useState("cart-total", () => 0);
export const useCartOffcanvas = () => useState("cart-offcanvas", () => false);

export const setStartingProducts = () => {
  const originalProducts = useOriginalProducts();
  const products = useProducts();
  const perPage = usePerPage();
  const currentPage = useCurrentPage();

  products.value = originalProducts.value.slice(0, perPage.value)
  currentPage.value = 1;
}
