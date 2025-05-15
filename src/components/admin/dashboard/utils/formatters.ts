
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
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}
