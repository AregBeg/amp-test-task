import z from 'zod';
import { RULES, VALIDATION_PATTERNS, FORM_CONFIG } from '@/config';

// Enhanced Login schema with better validation
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: RULES.REQUIRED('Email') })
    .email({ message: RULES.VALID_EMAIL })
    .regex(VALIDATION_PATTERNS.EMAIL, { message: RULES.VALID_EMAIL }),
  password: z
    .string()
    .min(1, { message: RULES.REQUIRED('Password') })
    .min(FORM_CONFIG.PASSWORD_MIN_LENGTH, {
      message: RULES.LENGTH(FORM_CONFIG.PASSWORD_MIN_LENGTH),
    }),
});

// OTP schema
export const OTPSchema = z.object({
  otp: z
    .string()
    .min(1, { message: RULES.REQUIRED('OTP') })
    .length(FORM_CONFIG.OTP_LENGTH, { message: RULES.INVALID_OTP })
    .regex(VALIDATION_PATTERNS.OTP, { message: RULES.INVALID_OTP }),
});

// Type exports
export type LoginFormData = z.infer<typeof LoginSchema>;
export type OTPFormData = z.infer<typeof OTPSchema>;
