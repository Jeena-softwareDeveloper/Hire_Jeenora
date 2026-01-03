import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import useAuthStore from '../store/useAuthStore';

const MainLayout = () => {
  const { userInfo, refreshUser } = useAuthStore(state => state);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(false); // Only for desktop

  const mainRef = useRef(null);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  // Refresh user data on mount to ensure name/profile is up to date
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

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
    <div className="flex flex-col w-full h-screen bg-[#F0F4F8] overflow-hidden">
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="flex flex-1 relative overflow-hidden lg:pt-[80px] pt-[70px]">

        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
        />
        <main
          ref={mainRef}
          className={`flex-1 flex flex-col overflow-y-auto transition-all duration-300
            ${collapsed ? "lg:ml-20" : "lg:ml-48"}
          `}
        >
          <div className="p-3 md:p-5 lg:p-7">
            <Outlet />
            {/* Footer could go here */}
          </div>
        </main>

      </div>
    </div>
  );
};

export default MainLayout;

