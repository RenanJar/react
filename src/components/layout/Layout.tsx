import React, { useState } from 'react';
import { NavigationItem } from '../sidebar/NavigationItem';
import { SideBar } from '../sidebar/SideBar';
import { HomeIcon, InformationCircleIcon, PhoneIcon, ServerIcon } from '@heroicons/react/16/solid';
import { useMediaQuery } from 'react-responsive';

const navigationItems: NavigationItem[] = [
  { title: 'Home', path: '/home', icon: <HomeIcon className="h-5 w-5" /> },
  { title: 'About', path: '/about', icon: <InformationCircleIcon className="h-5 w-5" /> },
  { title: 'Services', path: '/services', icon: <ServerIcon className="h-5 w-5" /> },
  { title: 'Contact', path: '/contact', icon: <PhoneIcon className="h-5 w-5" /> },
];

const propsgreen = {
  title: 'My SideBar',
  backgroundColor: 'bg-green-100',
  hoverBgColor: 'hover:bg-green-200',
  navigationItems: navigationItems,
};

const propswhite = {
  title: 'My SideBar white',
  backgroundColor: 'bg-pink-100',
  hoverBgColor: 'hover:bg-pink-200',
  navigationItems: navigationItems,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [propSideBar, setPropSideBar] = useState(propswhite);
  const [changeColor, setChangeColor] = useState(true);

  const changeCollor = () => {
    if (changeColor) {
      setPropSideBar(propsgreen);
      setChangeColor(false);
    } else {
      setChangeColor(true);
      setPropSideBar(propswhite);
    }
  };

  return (
    <div>
      <SideBar props={propSideBar} />
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        {/* <button
          className="flex items-center p-2 rounded-lg text-black backgroundColor: bg-white"
          onClick={changeCollor}
        >
          button
        </button> */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
