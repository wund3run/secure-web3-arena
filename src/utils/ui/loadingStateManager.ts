
import { designTokens } from '../design/tokens';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingConfig {
  minDuration?: number; // Minimum loading time to prevent flashing
  timeout?: number; // Timeout for loading state
  debounce?: number; // Debounce time before showing loading
}

export class LoadingStateManager {
  private static instances = new Map<string, LoadingInstance>();

  static create(id: string, config: LoadingConfig = {}): LoadingInstance {
    const instance = new LoadingInstance(id, config);
    this.instances.set(id, instance);
    return instance;
  }

  static get(id: string): LoadingInstance | undefined {
    return this.instances.get(id);
  }

  static remove(id: string): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.cleanup();
      this.instances.delete(id);
    }
  }

  static cleanup(): void {
    this.instances.forEach(instance => instance.cleanup());
    this.instances.clear();
  }
}

class LoadingInstance {
  private state: LoadingState = 'idle';
  private startTime: number = 0;
  private timeoutId: NodeJS.Timeout | null = null;
  private debounceId: NodeJS.Timeout | null = null;
  private listeners: Set<(state: LoadingState) => void> = new Set();

  constructor(
    private id: string,
    private config: LoadingConfig
  ) {}

  getState(): LoadingState {
    return this.state;
  }

  subscribe(listener: (state: LoadingState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async start(): Promise<void> {
    if (this.state === 'loading') return;

    this.clearTimeouts();

    if (this.config.debounce) {
      this.debounceId = setTimeout(() => {
        this.setState('loading');
      }, this.config.debounce);
    } else {
      this.setState('loading');
    }

    this.startTime = Date.now();

    if (this.config.timeout) {
      this.timeoutId = setTimeout(() => {
        this.setState('error');
      }, this.config.timeout);
    }
  }

  async complete(success: boolean = true): Promise<void> {
    if (this.state !== 'loading') return;

    this.clearTimeouts();

    const elapsed = Date.now() - this.startTime;
    const minDuration = this.config.minDuration || 0;

    if (elapsed < minDuration) {
      await new Promise(resolve => setTimeout(resolve, minDuration - elapsed));
    }

    this.setState(success ? 'success' : 'error');

    // Auto-reset to idle after a short delay
    setTimeout(() => {
      if (this.state !== 'loading') {
        this.setState('idle');
      }
    }, 1000);
  }

  reset(): void {
    this.clearTimeouts();
    this.setState('idle');
  }

  private setState(newState: LoadingState): void {
    if (this.state === newState) return;

    this.state = newState;
    this.listeners.forEach(listener => listener(newState));
  }

  private clearTimeouts(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.debounceId) {
      clearTimeout(this.debounceId);
      this.debounceId = null;
    }
  }

  cleanup(): void {
    this.clearTimeouts();
    this.listeners.clear();
  }
}

// React hook for using loading state
export function useLoadingState(id: string, config?: LoadingConfig) {
  const [state, setState] = React.useState<LoadingState>('idle');
  const instanceRef = React.useRef<LoadingInstance>();

  React.useEffect(() => {
    instanceRef.current = LoadingStateManager.create(id, config);
    const unsubscribe = instanceRef.current.subscribe(setState);

    return () => {
      unsubscribe();
      LoadingStateManager.remove(id);
    };
  }, [id]);

  const start = React.useCallback(() => {
    instanceRef.current?.start();
  }, []);

  const complete = React.useCallback((success = true) => {
    instanceRef.current?.complete(success);
  }, []);

  const reset = React.useCallback(() => {
    instanceRef.current?.reset();
  }, []);

  return {
    state,
    start,
    complete,
    reset,
    isLoading: state === 'loading',
    isError: state === 'error',
    isSuccess: state === 'success'
  };
}
