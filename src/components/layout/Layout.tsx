import React from 'react'
import { NavigationItem } from '../sidebar/NavigationItem'
import { SideBar } from '../sidebar/SideBar'
import { HomeIcon, InformationCircleIcon, PhoneIcon, ServerIcon } from '@heroicons/react/16/solid'
import { useMediaQuery } from 'react-responsive'

const navigationItems: NavigationItem[] = [
  { title: 'Home', path: '/home', icon: <HomeIcon className="h-5 w-5" /> },
  { title: 'About', path: '/about', icon: <InformationCircleIcon className="h-5 w-5" /> },
  { title: 'Services', path: '/services', icon: <ServerIcon className="h-5 w-5" /> },
  { title: 'Contact', path: '/contact', icon: <PhoneIcon className="h-5 w-5" /> }
]

const props = {
  title: 'My SideBar',
  backgroundColor: 'bg-green-100',
  hoverBgColor: 'hover:bg-green-200',
  navigationItems: navigationItems
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return (
    <div>
      <SideBar props={props} />
      <main className={`p-4 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        {children}
      </main>
    </div>
  )
}

export default Layout
