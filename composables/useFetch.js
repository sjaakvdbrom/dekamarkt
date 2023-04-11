export const getCategoryProducts = async (group, subgroup) => {
  const { data } = await useFetch(`https://api.dekamarkt.nl/v1/assortmentcache/group/${group}/${subgroup}/?api_key=6d3a42a3-6d93-4f98-838d-bcc0ab2307fd`)
  return data
  // console.log(toRaw(data.value))
}
