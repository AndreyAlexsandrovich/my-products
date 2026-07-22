import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const AppFooter = () => {
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#666',
    backgroundColor: '#fff',
    borderTop: '1px solid #f0f0f0',
    padding: '24px 50px',
  };

  return (
    <AntFooter style={footerStyle}>
      © {new Date().getFullYear()} Мои вещи — Все права защищены
    </AntFooter>
  );
};

export default AppFooter;