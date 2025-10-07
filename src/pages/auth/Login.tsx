import { FC, memo } from 'react';
import { AuthWrapper } from '@/components';
import { useAuth } from '@/providers';

interface IProps {}

const LoginComponent: FC<IProps> = () => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, don't show login form
  // The App component will handle showing the Dashboard
  if (isAuthenticated) {
    return null;
  }

  return <AuthWrapper showBackButton={true} className='bg-gray-50' />;
};

// Memoized component for better performance
export const Login = memo(LoginComponent);

Login.displayName = 'Login';
