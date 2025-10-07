import React from 'react';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

export { useAuth, useAuthActions } from '@/store/auth-store';

export default AuthProvider;
