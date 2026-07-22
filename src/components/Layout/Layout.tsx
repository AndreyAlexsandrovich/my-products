import React from 'react';
import { Layout as AntLayout } from 'antd';
import AppHeader from './header';
import AppContent from './content';
import AppFooter from './footer';

const AppLayout = () => {
  const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <AntLayout style={layoutStyle}>
      <AppHeader />
      <AppContent />
      <AppFooter />
    </AntLayout>
  );
};

export default AppLayout;