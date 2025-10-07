import { useMutation } from '@tanstack/react-query';
import { authApi } from './api';
import { useAuthStore } from '@/store/auth-store';
import type { LoginRequest, OTPRequest } from './types';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    retry: 2, // Retry failed requests twice
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    onSuccess: data => {
      // Store temporary auth data for OTP step
      localStorage.setItem(
        'temp-auth',
        JSON.stringify({
          token: data.token,
          user: data.user,
          requiresOTP: data.requiresOTP,
          otpExpiry: data.otpExpiry,
        })
      );
    },
    onError: error => {
      console.error('Login failed:', error);
      // Clear any existing temp auth on error
      localStorage.removeItem('temp-auth');
    },
  });
};

export const useOTPVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: OTPRequest) => authApi.verifyOTP(data),
    retry: 1, // Retry once for OTP verification
    retryDelay: 2000, // 2 second delay for retry
    onSuccess: data => {
      // Update store with final auth data
      const { setUser, setToken, setAuthenticated, saveToStorage } = useAuthStore.getState();
      setUser(data.user || null);
      setToken(data.token || null);
      setAuthenticated(true);
      
      // Save to localStorage using store method
      saveToStorage();
      
      // Clean up temp auth
      localStorage.removeItem('temp-auth');
    },
    onError: error => {
      console.error('OTP verification failed:', error);
      // Clear temp auth on OTP failure
      localStorage.removeItem('temp-auth');
    },
  });
};

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: () => authApi.resendOTP(),
    retry: 1, // Retry once for resend
    retryDelay: 1000, // 1 second delay
    onError: error => {
      console.error('Resend OTP failed:', error);
    },
  });
};
