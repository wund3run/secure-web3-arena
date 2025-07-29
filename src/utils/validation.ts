/**
 * Comprehensive validation utilities for the Hawkly platform
 */

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a wallet address format (Ethereum-style)
 * @param address - The wallet address to validate
 * @returns true if the address is valid, false otherwise
 */
export function isValidWalletAddress(address: string): boolean {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
}

/**
 * Validates a URL format
 * @param url - The URL to validate
 * @returns true if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates that a string is not empty and has minimum length
 * @param value - The string to validate
 * @param minLength - Minimum required length (default: 1)
 * @returns true if the string is valid, false otherwise
 */
export function isValidString(value: string, minLength: number = 1): boolean {
  return typeof value === 'string' && value.trim().length >= minLength;
}

/**
 * Validates that a number is within a specified range
 * @param value - The number to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns true if the number is within range, false otherwise
 */
export function isValidNumber(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && value >= min && value <= max;
}

/**
 * Validates a project budget amount
 * @param amount - The budget amount to validate
 * @returns true if the amount is valid, false otherwise
 */
export function isValidBudget(amount: number): boolean {
  return isValidNumber(amount, 100, 1000000); // $100 to $1M
}

/**
 * Validates audit request data
 * @param data - The audit request data to validate
 * @returns Validation result with errors if any
 */
export function validateAuditRequest(data: Record<string, unknown>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!isValidString(data.project_name as string, 3)) {
    errors.push('Project name must be at least 3 characters long');
  }

  if (!isValidString(data.description as string, 10)) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!isValidBudget(data.budget as number)) {
    errors.push('Budget must be between $100 and $1,000,000');
  }

  if (!isValidUrl(data.repository_url as string)) {
    errors.push('Repository URL must be a valid URL');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
} 