import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { NavigationItem } from './NavigationItem';

const { Sider } = Layout;

interface SideBarProps {
  title: string;
  navigationItems: Array<NavigationItem>;
}

export function SideBar({ props }: { props: SideBarProps }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const menuItems = props.navigationItems.map((item) => ({
    key: item.path,
    icon: item.icon,
    label: item.title,
    onClick: () => router.push(item.path),
    children: item.children?.map((child) => ({
      key: child.path,
      icon: child.icon,
      label: child.title,
      onClick: () => router.push(child.path),
    })),
  }));

  return (
    <Sider
      collapsible
      collapsed={isMobile ? true : collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      theme="light"
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        className={`
        h-8 
        m-4 
        text-center 
        text-blue-600 
        text-lg 
        font-bold
      `}
      >
        {!collapsed && props.title}
      </div>
      <Menu theme="light" mode="inline" selectedKeys={[router.pathname]} items={menuItems} />
    </Sider>
  );
}
