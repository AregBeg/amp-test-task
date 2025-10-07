import type {
  LoginRequest,
  LoginResponse,
  OTPRequest,
  OTPResponse,
  ResendOTPResponse,
} from './types';

export const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    // Mock implementation for development/testing
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        // Mock validation - accept any email/password for demo
        if (data.email && data.password) {
          const mockResponse: LoginResponse = {
            token: 'temp-token-' + Date.now(),
            user: {
              id: 1,
              email: data.email,
              name: data.email.split('@')[0], // Use email prefix as name
            },
            requiresOTP: true,
            otpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
          };
          resolve(mockResponse);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // 1 second delay to simulate network request
    });
  },

  verifyOTP: (data: OTPRequest): Promise<OTPResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock verification logic - accept any 6-digit OTP for demo
        if (data.otp.length === 6 && /^\d{6}$/.test(data.otp)) {
          const mockResponse: OTPResponse = {
            success: true,
            token: 'verified-jwt-token-' + Date.now(),
            user: {
              id: 1,
              email: 'user@example.com',
              name: 'User',
            },
            message: 'OTP verified successfully',
          };
          resolve(mockResponse);
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 1000);
    });
  },

  resendOTP: (): Promise<ResendOTPResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockResponse: ResendOTPResponse = {
          success: true,
          message: 'New OTP sent successfully',
          otpExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
        };
        resolve(mockResponse);
      }, 1000);
    });
  },
};
