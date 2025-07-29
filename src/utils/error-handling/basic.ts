export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleError(error: Error): void {
  console.error('Error:', error);
} 