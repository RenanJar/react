import React, { useState, useEffect } from 'react';
import { NavigationItem } from '../sidebar/NavigationItem';
import { SideBar } from '../sidebar/SideBar';
import {
  HomeIcon,
  CakeIcon,
  ClipboardIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '@/hooks/useAuth';

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    title: 'Cardápio',
    path: '/cardapio',
    icon: <CakeIcon className="h-6 w-6" />,
  },
  {
    title: 'Pedidos',
    path: '/pedidos',
    icon: <ClipboardIcon className="h-6 w-6" />,
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: <UsersIcon className="h-6 w-6" />,
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: <ChartBarIcon className="h-6 w-6" />,
  },
  {
    title: 'Configurações',
    path: '/configuracoes',
    icon: <CogIcon className="h-6 w-6" />,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { restaurante } = useAuth();
  const [sideBarProps, setSideBarProps] = useState({
    title: 'Pizza Manager', //quando a rota estiver pronta setar aqui o restaurante para exibir o nome certinho
    backgroundColor: 'bg-blue-900',
    hoverBgColor: 'hover:bg-blue-800',
    navigationItems: navigationItems,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SideBar props={sideBarProps} />
      <main className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
