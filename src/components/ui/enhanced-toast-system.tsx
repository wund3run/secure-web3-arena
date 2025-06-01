
import { toast } from 'sonner';

export class EnhancedToastSystem {
  static success(title: string, description?: string, duration = 4000) {
    return toast.success(title, {
      description,
      duration,
      action: {
        label: 'Dismiss',
        onClick: () => {}
      }
    });
  }

  static error(title: string, description?: string, duration = 6000) {
    return toast.error(title, {
      description,
      duration,
      action: {
        label: 'Retry',
        onClick: () => window.location.reload()
      }
    });
  }

  static info(title: string, description?: string, duration = 4000) {
    return toast.info(title, {
      description,
      duration
    });
  }

  static warning(title: string, description?: string, duration = 5000) {
    return toast.warning(title, {
      description,
      duration
    });
  }

  static loading(title: string, description?: string) {
    return toast.loading(title, {
      description
    });
  }

  static promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) {
    return toast.promise(promise, messages);
  }

  static payment = {
    processing: () => this.loading('Processing Payment', 'Please wait while we process your payment...'),
    success: () => this.success('Payment Successful', 'Your payment has been processed successfully'),
    failed: (reason?: string) => this.error('Payment Failed', reason || 'Please try again or contact support'),
    cancelled: () => this.info('Payment Cancelled', 'Your payment was cancelled')
  };

  static audit = {
    submitted: () => this.success('Audit Request Submitted', 'We will match you with qualified auditors'),
    assigned: (auditorName: string) => this.success('Auditor Assigned', `${auditorName} has been assigned to your audit`),
    completed: () => this.success('Audit Completed', 'Your security audit is now complete'),
    finding: (severity: string) => this.warning('New Finding', `A ${severity} severity issue was discovered`)
  };
}
