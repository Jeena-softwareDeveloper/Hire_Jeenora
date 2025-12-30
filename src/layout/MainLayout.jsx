import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import useAuthStore from '../store/useAuthStore';

const MainLayout = () => {
  const { userInfo } = useAuthStore(state => state);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false); // Only for desktop

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setShowSidebar(false);   // Hide sidebar on mobile
        setCollapsed(false);     // Disable collapse mode on mobile
      } else {
        setShowSidebar(true);    // Show sidebar on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Socket connect
  useEffect(() => {
    if (userInfo?.role === 'hireuser') {
      socket.emit('add_hireuser', userInfo._id, userInfo);

      return () => {
        socket.emit('remove_hireuser', userInfo._id);
      };
    }
  }, [userInfo]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">

      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="flex flex-1 relative">

        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
        />
        <main
          className={`flex-1 overflow-y-auto bg-green-50 lg:pt-[80px] pt-[68px]
            ${collapsed ? "lg:ml-16" : "lg:ml-64"}
          `}
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;
