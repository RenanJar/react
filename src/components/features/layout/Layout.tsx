import React from 'react';
import { Layout as AntLayout } from 'antd';
import { SideBar } from '../sidebar/SideBar';
import {
  HomeOutlined,
  ShopOutlined,
  FileOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { NavigationItem } from '../sidebar/NavigationItem';
import { logout } from '@/services/api/auth';

const { Content } = AntLayout;

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <HomeOutlined />,
  },
  {
    title: 'Cardápio',
    path: '/cardapio',
    children: [
      {
        title: 'Cardápio',
        path: '/cardapio',
        icon: <ShopOutlined />,
      },
      {
        title: 'Categorias',
        path: '/categorias',
        icon: <ShopOutlined />,
      },
      {
        title: 'Produtos',
        path: '/produtos',
        icon: <ShopOutlined />,
      },
    ],
    icon: <ShopOutlined />,
  },
  {
    title: 'Pedidos',
    path: '/pedidos',
    icon: <FileOutlined />,
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: <UserOutlined />,
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: <BarChartOutlined />,
  },
  {
    title: 'Configurações',
    path: '/configuracoes',
    icon: <SettingOutlined />,
  },
  {
    title: 'Sair',
    path: '#',
    icon: <LogoutOutlined />,
    onClick: () => logout(),
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <SideBar props={{ title: 'ABC PIZZAS', navigationItems }} />
      <AntLayout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
}
