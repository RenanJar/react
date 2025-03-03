import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavigationItem } from './NavigationItem';
import { Bars4Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';

interface SideBarProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  navigationItems: Array<NavigationItem>;
}

const SidebarContainer = ({
  children,
  backgroundColor,
  visible,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  visible: boolean;
}) => (
  <div
    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
      visible ? 'translate-x-0' : '-translate-x-full'
    } ${backgroundColor} bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5`}
  >
    {children}
  </div>
);

const SidebarHeader = ({ title }: { title: React.ReactNode }) => (
  <div className="p-4 mb-2">
    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-black">
      {title}
    </h5>
  </div>
);

const SidebarNav = ({ children }: { children: React.ReactNode }) => (
  <nav className="flex min-w-[80%] flex-col gap-1 p-2 font-sans text-base font-normal text-black">
    {children}
  </nav>
);

const SidebarNavItem = ({
  children,
  hoverBgColor,
  onClick,
  path,
  icon,
}: {
  children?: React.ReactNode;
  hoverBgColor?: string;
  onClick?: () => void;
  path: string;
  icon?: React.ReactNode;
}) => (
  <Link
    href={path}
    className={`flex items-center p-2 rounded-lg text-black ${hoverBgColor} group`}
    onClick={onClick}
  >
    <span>{icon}</span>
    <span className="flex-1 ms-3 whitespace-nowrap ">{children}</span>
  </Link>
);

const ButtonToggle = ({
  toggleSideBar,
}: {
  children?: React.ReactNode;
  toggleSideBar: () => void;
}) => (
  <button onClick={toggleSideBar} className="flex items-center justify-center w-10 h-10">
    <Bars4Icon className="w-6 h-6" />
  </button>
);

export function SideBar({ props }: { props: SideBarProps }) {
  const [visible, setIsOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => setIsOpen(!visible);
  const handleNavItemClick = () => (isMobile ? setIsOpen(false) : null);

  return (
    <>
      {isMobile && <ButtonToggle toggleSideBar={toggleSidebar} />}
      <SidebarContainer backgroundColor={props.backgroundColor} visible={visible}>
        <SidebarHeader title={props.title} />
        <SidebarNav>
          {props.navigationItems.map((item, index) => (
            <SidebarNavItem
              key={index}
              hoverBgColor={props.hoverBgColor}
              onClick={handleNavItemClick}
              icon={item.icon}
              path={item.path}
            >
              {item.title}
            </SidebarNavItem>
          ))}
        </SidebarNav>
      </SidebarContainer>
    </>
  );
}
