import { ReactNode } from 'react';
import { Layout as AntdLayout } from 'antd';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AntdLayout className='bg-[#F5F5F5] !min-h-screen text-center justify-center items-center'>
      <main className='max-w-[1200px] mx-auto p-[20px_10px]'>{children}</main>
    </AntdLayout>
  );
};
