export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export const auditFormValidationSchema: ValidationSchema = {
  projectName: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_.]+$/
  },
  projectDescription: {
    required: true,
    minLength: 20,
    maxLength: 2000
  },
  blockchain: {
    required: true
  },
  customBlockchain: {
    custom: (value: unknown) => {
      const stringValue = String(value || '');
      if (!stringValue || stringValue.trim().length < 2) {
        return "Custom blockchain name must be at least 2 characters";
      }
      return null;
    }
  },
  repositoryUrl: {
    pattern: /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)/,
    custom: (value: unknown) => {
      const stringValue = String(value || '');
      if (stringValue && !stringValue.match(/^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)/)) {
        return "Please provide a valid GitHub, GitLab, or Bitbucket URL";
      }
      return null;
    }
  },
  contractCount: {
    required: true
  },
  linesOfCode: {
    required: true
  },
  deadline: {
    required: true
  },
  budget: {
    required: true
  },
  contactEmail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  contactName: {
    required: true,
    minLength: 2,
    maxLength: 50
  }
};

export const validateField = (fieldName: string, value: unknown, schema: ValidationSchema): string | null => {
  const rule = schema[fieldName];
  if (!rule) return null;

  // Required validation
  if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return `${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  // String length validations
  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters long`;
    }
    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must not exceed ${rule.maxLength} characters`;
    }
  }

  // Pattern validation
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return `Invalid format for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
};

export const validateForm = (formData: unknown, schema: ValidationSchema): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  Object.keys(schema).forEach(fieldName => {
    const data = formData as Record<string, unknown>;
    const error = validateField(fieldName, data[fieldName], schema);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};
