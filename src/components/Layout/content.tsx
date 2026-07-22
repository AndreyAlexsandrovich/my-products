import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content: AntContent } = Layout;

const AppContent = () => {
  const contentStyle: React.CSSProperties = {
    padding: '24px',
    minHeight: 'calc(100vh - 128px)',
    background: '#f5f5f5',
  };

  return (
    <AntContent style={contentStyle}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Outlet /> 
      </div>
    </AntContent>
  );
};

export default AppContent;