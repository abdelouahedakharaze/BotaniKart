interface ValidationRules {
  [key: string]: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
  }
}

interface ValidationErrors {
  [key: string]: string
}

export const validateForm = (values: Record<string, any>, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {}

  for (const field in rules) {
    const value = values[field]
    const fieldRules = rules[field]

    if (fieldRules.required && !value) {
      errors[field] = 'This field is required'
    }

    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Minimum length is ${fieldRules.minLength} characters`
    }

    if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `Maximum length is ${fieldRules.maxLength} characters`
    }

    if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = 'Invalid format'
    }
  }

  return errors
}