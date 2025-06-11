
/**
 * Centralized loading state management for better UX consistency
 */

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
  error?: string;
}

export const DEFAULT_LOADING_MESSAGES = {
  auth: 'Authenticating...',
  data: 'Loading data...',
  page: 'Loading page...',
  upload: 'Uploading file...',
  save: 'Saving changes...',
  delete: 'Deleting...',
  submit: 'Submitting...',
  search: 'Searching...',
} as const;

export class LoadingStateManager {
  private static states = new Map<string, LoadingState>();
  private static listeners = new Set<(states: Map<string, LoadingState>) => void>();

  static setLoading(key: string, message?: string, progress?: number) {
    this.states.set(key, {
      isLoading: true,
      message: message || DEFAULT_LOADING_MESSAGES[key as keyof typeof DEFAULT_LOADING_MESSAGES] || 'Loading...',
      progress,
    });
    this.notifyListeners();
  }

  static setError(key: string, error: string) {
    this.states.set(key, {
      isLoading: false,
      error,
    });
    this.notifyListeners();
  }

  static setComplete(key: string) {
    this.states.delete(key);
    this.notifyListeners();
  }

  static getState(key: string): LoadingState | undefined {
    return this.states.get(key);
  }

  static isLoading(key: string): boolean {
    return this.states.get(key)?.isLoading || false;
  }

  static subscribe(listener: (states: Map<string, LoadingState>) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private static notifyListeners() {
    this.listeners.forEach(listener => listener(new Map(this.states)));
  }

  static clear() {
    this.states.clear();
    this.notifyListeners();
  }
}
