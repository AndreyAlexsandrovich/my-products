import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const AppHeader = () => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: 64,
    paddingInline: 48,
    backgroundColor: '#1677ff',
  };

  const items = [
    { key: '/', label: 'Главная' },
    { key: '/wardrobe',  label: 'Список' },
    { key: '/wardrobe/add', label: 'Добавить' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <AntHeader style={headerStyle}>
      <div style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginRight: 40 }}>
        📦 Мои вещи
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          minWidth: 0,
          borderBottom: 'none',
          lineHeight: '64px',
        }}
        theme="light"
      />
    </AntHeader>
  );
};

export default AppHeader;