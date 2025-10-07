import React, { memo } from 'react';
import { Card, Flex, Typography, Button, Avatar, Divider } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  CheckCircleOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';
import { useAuth, useAuthActions } from '@/store/auth-store';
import { IMAGES_PATHS } from '@/config';

const { Title, Text } = Typography;

const DashboardComponent: React.FC = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <Card className='mb-6'>
          <Flex justify='space-between' align='center'>
            <Flex align='center' gap={12}>
              <img
                src={IMAGES_PATHS.COMPANY_LOGO}
                alt='company logo'
                className='w-8 h-8'
              />
              <Title level={3} className='mb-0'>
                Dashboard
              </Title>
            </Flex>
            <Button
              type='primary'
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Flex>
        </Card>

        {/* Welcome Section */}
        <Card className='mb-6'>
          <Flex align='center' gap={16} className='mb-6'>
            <Avatar size={64} icon={<UserOutlined />} className='bg-blue-500' />
            <div>
              <Title level={2} className='mb-2'>
                Welcome back, {user?.name || user?.email}!
              </Title>
              <Text className='text-gray-600 text-lg'>
                You have successfully completed the authentication process.
              </Text>
            </div>
          </Flex>

          <Divider />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='text-center p-6 bg-green-50 rounded-lg border border-green-200'>
              <CheckCircleOutlined className='text-4xl text-green-500 mb-4' />
              <Title level={4} className='text-green-700 mb-2'>
                Authentication Complete
              </Title>
              <Text className='text-green-600'>
                Your account has been verified with two-factor authentication.
              </Text>
            </div>

            <div className='text-center p-6 bg-blue-50 rounded-lg border border-blue-200'>
              <SecurityScanOutlined className='text-4xl text-blue-500 mb-4' />
              <Title level={4} className='text-blue-700 mb-2'>
                Secure Access
              </Title>
              <Text className='text-blue-600'>
                Your session is protected and encrypted.
              </Text>
            </div>
          </div>
        </Card>

        {/* User Information */}
        <Card className='mb-6'>
          <Title level={4} className='mb-4'>
            Account Information
          </Title>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Text strong className='text-gray-700'>
                Email Address:
              </Text>
              <br />
              <Text className='text-gray-600'>{user?.email}</Text>
            </div>
            <div>
              <Text strong className='text-gray-700'>
                User ID:
              </Text>
              <br />
              <Text className='text-gray-600'>{user?.id}</Text>
            </div>
            <div>
              <Text strong className='text-gray-700'>
                Display Name:
              </Text>
              <br />
              <Text className='text-gray-600'>{user?.name || 'Not set'}</Text>
            </div>
            <div>
              <Text strong className='text-gray-700'>
                Account Status:
              </Text>
              <br />
              <Text className='text-green-600 font-medium'>
                Active & Verified
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Memoized component for better performance
export const Dashboard = memo(DashboardComponent);

export default Dashboard;
