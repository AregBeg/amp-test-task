export const RULES = {
  VALID_EMAIL: 'Must be a valid email address',
  LENGTH: (num: number) => `Password must be at least ${num} characters`,
  REQUIRED: (field: string) => `${field} is required`,
  INVALID_OTP: 'OTP must be 6 digits',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  LOGIN_FAILED: 'Invalid email or password',
  OTP_VERIFICATION_FAILED: 'Invalid OTP. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  OTP: /^\d{6}$/,
} as const;

export const FORM_CONFIG = {
  DEBOUNCE_DELAY: 300,
  OTP_LENGTH: 6,
  OTP_EXPIRY_TIME: 60, // 1 minute in seconds
  MAX_LOGIN_ATTEMPTS: 3,
  PASSWORD_MIN_LENGTH: 8,
} as const;
