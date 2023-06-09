export const useProducts = () => useState("api-products", () => []);
export const useOriginalProducts = () => useState("api-original-products", () => []);
export const useProduct = () => useState("api-product", () => []);

export const getCategoryProducts = async (group, subgroup) => {
  const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/${group}/${subgroup}/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
  return data
  // console.log(toRaw(data.value))
}
