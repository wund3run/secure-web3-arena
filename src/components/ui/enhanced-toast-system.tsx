
import { toast } from 'sonner';

export class EnhancedToastSystem {
  static success(title: string, description?: string) {
    toast.success(title, { description });
  }

  static error(title: string, description?: string) {
    toast.error(title, { description });
  }

  static warning(title: string, description?: string) {
    toast.warning(title, { description });
  }

  static info(title: string, description?: string) {
    toast.info(title, { description });
  }

  static loading(title: string, description?: string) {
    return toast.loading(title, { description });
  }

  static dismiss(toastId: string | number) {
    toast.dismiss(toastId);
  }

  static promise<T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return toast.promise(promise, options);
  }
}
