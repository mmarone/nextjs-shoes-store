export const getDiscountedPricePercentage = (
  originalPrice: number,
  price: number,
) => {
  const discount = originalPrice - price
  const discountPercentage = (discount / originalPrice) * 100

  return discountPercentage.toFixed(2)
}

export const getNumberComma = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
