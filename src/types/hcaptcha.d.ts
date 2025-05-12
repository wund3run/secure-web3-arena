
declare global {
  interface Window {
    hcaptcha: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string;
          theme?: 'light' | 'dark';
          size?: 'normal' | 'compact' | 'invisible';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'chalexpired-callback'?: () => void;
          'error-callback'?: (error: string) => void;
          [key: string]: any;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      remove: (widgetId?: number) => void;
      execute: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

export {};
