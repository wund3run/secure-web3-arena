
/**
 * Validates an email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates that a string meets minimum length requirements
 */
export const meetsMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Validates that a string doesn't exceed maximum length
 */
export const meetsMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

/**
 * Validates that a value is not empty
 */
export const isNotEmpty = (value: any): boolean => {
  if (typeof value === "string") return value.trim() !== "";
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validates that a value is a number or can be parsed as a number
 */
export const isNumber = (value: any): boolean => {
  if (typeof value === "number") return !isNaN(value);
  if (typeof value === "string") return !isNaN(Number(value));
  return false;
};
