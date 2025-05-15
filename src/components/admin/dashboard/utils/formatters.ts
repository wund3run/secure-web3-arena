
/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, options?: { currency?: string; minimumFractionDigits?: number; maximumFractionDigits?: number }): string {
  const {
    currency = 'USD',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0
  } = options || {};
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
}

/**
 * Format a number with thousands separators
 */
export function formatNumber(number: number, options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0
  } = options || {};
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(number);
}

/**
 * Format a percentage
 */
export function formatPercentage(value: number, options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 1
  } = options || {};
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value / 100);
}

/**
 * Format a date
 */
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' = 'medium'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }
  }[format];
  
  // The TypeScript error is because the string values for 'year' need to be type-corrected to match "numeric" | "2-digit"
  // Let's create a properly typed options object
  const typedOptions: Intl.DateTimeFormatOptions = {};
  
  // Add month formatting
  if (options.month === 'numeric') typedOptions.month = 'numeric';
  else if (options.month === 'short') typedOptions.month = 'short';
  else if (options.month === 'long') typedOptions.month = 'long';
  
  // Add day formatting
  if (options.day === 'numeric') typedOptions.day = 'numeric';
  
  // Add year formatting (this was causing the TypeScript error)
  if (options.year === '2-digit') typedOptions.year = '2-digit';
  else if (options.year === 'numeric') typedOptions.year = 'numeric';
  
  // Add weekday if present
  if (options.weekday === 'long') typedOptions.weekday = 'long';
  
  return new Intl.DateTimeFormat('en-US', typedOptions).format(dateObj);
}
