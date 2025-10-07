import React, { useState, useCallback, memo } from 'react';
import { Card, Flex, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { LoginForm, OTPForm } from '@/forms';
import { IMAGES_PATHS } from '@/config';
import { useAuth, useAuthActions } from '@/providers/auth-provider';
import type { LoginFormData } from '@/forms/auth/login.schema';

const { Text, Title } = Typography;

interface AuthWrapperProps {
  className?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

type AuthStep = 'login' | 'otp';

const AuthWrapperComponent: React.FC<AuthWrapperProps> = ({
  showBackButton = false,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [userEmail, setUserEmail] = useState<string>('');
  const { error } = useAuth();
  const { clearError } = useAuthActions();

  const handleLoginSuccess = useCallback(
    (data?: LoginFormData) => {
      try {
        if (data?.email) {
          setUserEmail(data.email);
        }
        setCurrentStep('otp');
        clearError();
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    [clearError]
  );

  const handleOTPSuccess = useCallback(() => {
  }, []);

  const handleBackToLogin = useCallback(() => {
    setCurrentStep('login');
    setUserEmail('');
    clearError();
    onBack?.();
  }, [clearError, onBack]);

  const handleResendOTP = useCallback(async () => {
    try {
      console.log('Resend OTP requested');
    } catch (error) {
      console.error('Resend OTP error:', error);
    }
  }, []);

  const handleFormError = useCallback((error: string) => {
    console.error('Form error:', error);
  }, []);

  const getStepContent = () => {
    switch (currentStep) {
      case 'login':
        return {
          title: 'Sign in to your account to continue',
          subtitle: null,
          form: <LoginForm onSuccess={handleLoginSuccess} />,
        };

      case 'otp':
        return {
          title: 'Two-Factor Authentication',
          subtitle: 'Enter the 6-digit code from the Google Authenticator app',
          form: (
            <OTPForm
              onSuccess={handleOTPSuccess}
              onError={handleFormError}
              onResend={handleResendOTP}
              email={userEmail}
              className='mt-6'
            />
          ),
        };

      default:
        return {
          title: 'Authentication',
          subtitle: 'Please complete the authentication process',
          form: null,
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <Flex justify='center' align='center' className={'sm:w-[440px]'}>
      <Card className='!p-[20px_10px]'>
        {/* Header with back button */}
        <Flex justify='space-between' align='center' className='mb-3'>
          {showBackButton && currentStep === 'otp' && (
            <Button
              type='text'
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToLogin}
              className='p-0 h-auto'
            />
          )}
          <div className='flex-1' />
        </Flex>

        {/* Logo and Company Name */}
        <Flex justify='center' align='center' gap={10} className='!mb-8'>
          <img src={IMAGES_PATHS.COMPANY_LOGO} alt='company logo' />
          <Text className='text-lg font-semibold'>Company</Text>
        </Flex>

        {/* Title and Subtitle */}
        <div className='text-center mb-6'>
          <Title level={3} className='mb-2 text-[24px] leading-[32px]'>
            {stepContent.title}
          </Title>
          <Text className='text-[16px] leading-[24px]'>
            {stepContent.subtitle}
          </Text>
        </div>

        {/* Error Display */}
        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded text-center'>
            <Text type='danger' className='text-sm'>
              {error}
            </Text>
          </div>
        )}

        {/* Form */}
        {stepContent.form}
      </Card>
    </Flex>
  );
};

// Memoized component for better performance
export const AuthWrapper = memo(AuthWrapperComponent);

export default AuthWrapper;
