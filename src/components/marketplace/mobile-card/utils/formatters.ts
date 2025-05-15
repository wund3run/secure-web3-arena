
/**
 * Formatters for mobile card display
 */

/**
 * Format price display for mobile cards
 * @param price - Price value to format
 * @param currency - Currency code (USD, EUR, etc)
 * @param model - Pricing model (hourly, fixed, etc)
 * @returns Formatted price string
 */
export const formatMobileCardPrice = (
  price: number, 
  currency: string = "USD", 
  model: "fixed" | "hourly" | "range" = "fixed"
): string => {
  // Format the price based on currency
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedPrice = formatter.format(price);
  
  // Add suffix for hourly pricing
  if (model === "hourly") {
    return `${formattedPrice}/hr`;
  }
  
  return formattedPrice;
};

/**
 * Format description text with truncation if needed
 * @param description - Description text to format
 * @param maxLength - Maximum length before truncation
 * @returns Formatted description text
 */
export const formatDescription = (description: string, maxLength: number = 100): string => {
  if (description.length <= maxLength) {
    return description;
  }
  
  return `${description.substring(0, maxLength)}...`;
};

/**
 * Format rating display (e.g. 4.5 -> "4.5")
 * @param rating - Rating value
 * @param precision - Number of decimal places
 * @returns Formatted rating string
 */
export const formatRating = (rating: number, precision: number = 1): string => {
  return rating.toFixed(precision);
};
