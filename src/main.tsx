import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App.tsx';
import { QueryProvider } from './providers';
import { antdTheme } from './config';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={antdTheme}>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ConfigProvider>
  </React.StrictMode>
);
