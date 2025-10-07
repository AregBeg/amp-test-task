import React, { useCallback, useMemo, memo } from 'react';
import { Form, Input, Button, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { LoginSchema, type LoginFormData } from '@/forms';
import { useLoginMutation } from '@/service/auth/mutations';
import { useAuthActions } from '@/store/auth-store';
import { RULES, FORM_CONFIG } from '@/config';

interface LoginFormProps {
  onSuccess?: (data?: LoginFormData) => void;
  onError?: (error: string) => void;
  className?: string;
}

const LoginFormComponent: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  className = '',
}) => {
  const loginMutation = useLoginMutation();
  const {
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    setError: setStoreError,
  } = useAuthActions();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Memoized form state
  const formState = useMemo(
    () => ({
      isLoading: isSubmitting || loginMutation.isPending,
      canSubmit:
        isValid && isDirty && !isSubmitting && !loginMutation.isPending,
      hasErrors: Object.keys(errors).length > 0,
    }),
    [isValid, isDirty, isSubmitting, loginMutation.isPending, errors]
  );

  // Enhanced error handling
  const handleFormError = useCallback(
    (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : RULES.LOGIN_FAILED;

      message.error(errorMessage);
      onError?.(errorMessage);

      // Set field-specific errors if available
      if (error instanceof Error && error.message.includes('email')) {
        setStoreError(RULES.VALID_EMAIL);
      } else if (error instanceof Error && error.message.includes('password')) {
        setStoreError(RULES.LENGTH(FORM_CONFIG.PASSWORD_MIN_LENGTH));
      }
    },
    [onError]
  );

  // Optimized submit handler
  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        clearErrors();
        setLoading(true);

        const response = await loginMutation.mutateAsync(data);

        // Update Zustand store
        setUser(response.user);
        setToken(response.token);
        setAuthenticated(false); // Not fully authenticated until OTP
        setLoading(false);

        onSuccess?.(data);
        reset();
      } catch (error) {
        setLoading(false);
        handleFormError(error);
      }
    },
    [
      loginMutation,
      onSuccess,
      reset,
      clearErrors,
      handleFormError,
      setUser,
      setToken,
      setAuthenticated,
      setLoading,
      setStoreError,
    ]
  );

  // Input field renderer with enhanced styling
  const renderInput = useCallback(
    (
      name: keyof LoginFormData,
      placeholder: string,
      type: 'email' | 'password' = 'email',
      icon: React.ReactNode
    ) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            prefix={icon}
            placeholder={placeholder}
            size='large'
            type={type}
            autoComplete={type === 'email' ? 'email' : 'current-password'}
            status={errors[name] ? 'error' : ''}
            className='transition-all duration-200 hover:border-blue-400 focus:border-blue-500'
          />
        )}
      />
    ),
    [control, errors]
  );

  return (
    <div className={className}>
      <Form
        layout='vertical'
        onFinish={handleSubmit(onSubmit)}
        className='space-y-4'
      >
        {/* Email Field */}
        <Form.Item
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          required
          className='mb-4'
        >
          {renderInput(
            'email',
            'Enter your email address',
            'email',
            <UserOutlined className='text-gray-400' />
          )}
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
          required
          className='mb-6'
        >
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined className='text-gray-400' />}
                placeholder='Enter your password'
                size='large'
                autoComplete='current-password'
                status={errors.password ? 'error' : ''}
                className='transition-all duration-200 hover:border-blue-400 focus:border-blue-500'
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className='mb-0'>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            loading={formState.isLoading}
            disabled={!formState.canSubmit}
            className='w-full h-12 font-semibold transition-all duration-200 hover:shadow-lg'
          >
            {formState.isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Memoized component for better performance
export const LoginForm = memo(LoginFormComponent);

export default LoginForm;
