import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Typography,
  Space,
  Progress,
} from 'antd';
import {
  ReloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { OTPSchema, type OTPFormData } from './login.schema';
import { RULES, FORM_CONFIG } from '@/config';
import {
  useOTPVerificationMutation,
  useResendOTPMutation,
} from '@/service/auth/mutations';

const { Text } = Typography;

interface OTPFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onResend?: () => Promise<void>;
  className?: string;
  email?: string;
  autoFocus?: boolean;
}

const OTPFormComponent: React.FC<OTPFormProps> = ({
  onSuccess,
  onError,
  onResend,
  className = '',
  autoFocus = true,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(FORM_CONFIG.OTP_EXPIRY_TIME);
  const [isResending, setIsResending] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  // Get TanStack Query mutations
  const otpMutation = useOTPVerificationMutation();
  const resendMutation = useResendOTPMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    clearErrors,
  } = useForm<OTPFormData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formState = useMemo(
    () => ({
      isLoading: isSubmitting || otpMutation.isPending,
      canSubmit:
        isValid &&
        isDirty &&
        !isSubmitting &&
        !isExpired &&
        !otpMutation.isPending,
      hasErrors: Object.keys(errors).length > 0,
      canResend: timeLeft === 0 && !isResending,
      progress:
        ((FORM_CONFIG.OTP_EXPIRY_TIME - timeLeft) /
          FORM_CONFIG.OTP_EXPIRY_TIME) *
        100,
    }),
    [
      isValid,
      isDirty,
      isSubmitting,
      isExpired,
      otpMutation.isPending,
      errors,
      timeLeft,
      isResending,
    ]
  );

  const generateOTP = useCallback(() => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    // Generated OTP for development
    return otp;
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isExpired) {
      setIsExpired(true);
    }
  }, [timeLeft, isExpired]);

  useEffect(() => {
    generateOTP();
  }, [generateOTP]);

  const handleFormError = useCallback(
    (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : RULES.OTP_VERIFICATION_FAILED;

      message.error(errorMessage);
      onError?.(errorMessage);

      // Increment attempts
      setAttempts(prev => {
        const newAttempts = prev + 1;
        // Lock form after max attempts
        if (newAttempts >= FORM_CONFIG.MAX_LOGIN_ATTEMPTS) {
          message.error('Too many failed attempts. Please request a new OTP.');
          // Use setTimeout to avoid circular dependency
          setTimeout(() => {
            generateOTP();
            setTimeLeft(FORM_CONFIG.OTP_EXPIRY_TIME);
            setIsExpired(false);
            setAttempts(0);
            reset();
            clearErrors();
          }, 100);
        }
        return newAttempts;
      });
    },
    [onError, generateOTP, reset, clearErrors]
  );

  const onSubmit = useCallback(
    async (data: OTPFormData) => {
      try {
        clearErrors();

        await otpMutation.mutateAsync(data);

        // The mutation already handles updating the store and setting authentication
        // Just handle the UI state here
        onSuccess?.();
        reset();
      } catch (error) {
        handleFormError(error);
      }
    },
    [
      otpMutation,
      onSuccess,
      reset,
      clearErrors,
      handleFormError,
    ]
  );

  const handleResendOTP = useCallback(async () => {
    setIsResending(true);
    try {
      // Call custom resend handler if provided
      if (onResend) {
        await onResend();
      } else {
        // Use TanStack Query resend mutation
        await resendMutation.mutateAsync();
      }

      generateOTP();
      setTimeLeft(FORM_CONFIG.OTP_EXPIRY_TIME);
      setIsExpired(false);
      setAttempts(0);
      reset();
      clearErrors();
    } catch (error) {
      message.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  }, [onResend, resendMutation, generateOTP, reset, clearErrors]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className={className}>
      <div className='mb-4'>
        <Progress
          percent={formState.progress}
          showInfo={false}
          strokeColor={
            timeLeft > 30 ? '#52c41a' : timeLeft > 10 ? '#faad14' : '#ff4d4f'
          }
          className='mb-2'
        />
        <div className='flex justify-between items-center text-sm'>
          <Space>
            <ClockCircleOutlined className='text-gray-400' />
            <Text className='text-gray-500'>
              {isExpired ? 'Expired' : `Expires in ${formatTime(timeLeft)}`}
            </Text>
          </Space>
          {attempts > 0 && (
            <Text type='danger' className='text-xs'>
              {attempts}/{FORM_CONFIG.MAX_LOGIN_ATTEMPTS} attempts
            </Text>
          )}
        </div>
      </div>

      <Form
        layout='vertical'
        onFinish={handleSubmit(
          formState.canResend ? handleResendOTP : onSubmit
        )}
        className='space-y-4'
      >
        <Form.Item
          validateStatus={errors.otp ? 'error' : ''}
          help={errors.otp?.message}
          required
          className='text-center mb-6'
        >
          <Controller
            name='otp'
            control={control}
            render={({ field }) => (
              <Input.OTP
                {...field}
                size='large'
                length={FORM_CONFIG.OTP_LENGTH}
                autoFocus={autoFocus}
                status={errors.otp ? 'error' : ''}
                className='justify-center'
                disabled={isExpired}
              />
            )}
          />
        </Form.Item>

        <Form.Item className='mb-4'>
          {formState.canResend ? (
            <Button
              type='default'
              htmlType='submit'
              size='large'
              loading={isResending}
              className='w-full h-12'
              icon={<ReloadOutlined />}
            >
              {isResending ? 'Sending...' : 'Resend OTP'}
            </Button>
          ) : (
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              loading={formState.isLoading}
              disabled={!formState.canSubmit}
              className='w-full h-12 font-semibold'
              icon={isValid ? <CheckCircleOutlined /> : undefined}
            >
              {formState.isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          )}
        </Form.Item>

        {formState.hasErrors && (
          <div className='text-center'>
            <Text type='danger' className='text-sm'>
              {isExpired
                ? 'OTP has expired. Please request a new one.'
                : 'Please fix the errors above to continue'}
            </Text>
          </div>
        )}
      </Form>

      {process.env.NODE_ENV === 'development' && generatedOTP && (
        <div className='mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-center'>
          <Text type='warning' className='text-xs'>
            Development Mode: OTP is {generatedOTP}
          </Text>
        </div>
      )}
    </div>
  );
};

// Memoized component for better performance
export const OTPForm = memo(OTPFormComponent);

export default OTPForm;
