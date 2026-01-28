/**
 * Format a number to Indonesian Rupiah (IDR) currency format.
 * @param price - The numeric price to format
 * @returns Formatted currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate discount percentage.
 * @param price - Current price
 * @param originalPrice - Original price
 * @returns Percentage of discount or undefined
 */
export function calculateDiscount(price: number, originalPrice: number | null | undefined): number | undefined {
  if (!originalPrice || originalPrice <= price) return undefined;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
