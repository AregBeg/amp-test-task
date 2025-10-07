import { z } from 'zod';
import { LoginSchema, OTPSchema } from '@/forms';

// Request types
export type LoginRequest = z.infer<typeof LoginSchema>;
export type OTPRequest = z.infer<typeof OTPSchema>;

// Response types
export const LoginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    name: z.string().optional(),
  }),
  requiresOTP: z.boolean().optional(),
  otpExpiry: z.number().optional(),
});

export const OTPResponseSchema = z.object({
  success: z.boolean(),
  token: z.string().optional(),
  user: z
    .object({
      id: z.number(),
      email: z.string(),
      name: z.string().optional(),
    })
    .optional(),
  message: z.string().optional(),
});

export const ResendOTPResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  otpExpiry: z.number().optional(),
});

// Type exports
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type OTPResponse = z.infer<typeof OTPResponseSchema>;
export type ResendOTPResponse = z.infer<typeof ResendOTPResponseSchema>;

// Auth state types
export interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse['user'] | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Auth context types
export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  verifyOTP: (otp: OTPRequest) => Promise<void>;
  resendOTP: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
