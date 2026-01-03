import React, { useState, useRef, useEffect } from 'react';
import { FaList, FaSearch, FaBell, FaUser, FaChevronDown, FaBriefcase } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAuthStore from '../store/useAuthStore';
import { socket } from '../utils/utils';
import { useGetNotifications, useMarkNotificationRead, useDeleteAllNotifications } from '../hooks/useNotifications';
import { useGetProfile } from '../hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

const Header = ({ showSidebar, setShowSidebar }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
  const { data: profile } = useGetProfile();

  const { data: notificationsData } = useGetNotifications({
    enabled: !!userInfo
  });
  const notifications = notificationsData?.notifications || [];
  const unreadCount = notificationsData?.unreadCount || 0;

  const markAsReadMutation = useMarkNotificationRead();
  const deleteAllMutation = useDeleteAllNotifications();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Socket listener for real-time updates
  useEffect(() => {
    const handleNewNotification = (data) => {
      console.log('[Header] Received new_notification socket event:', data);
      if (data && String(data.recipientId) === String(userInfo?._id)) {
        // Invalidate query to refetch
        queryClient.invalidateQueries(['notifications']);
      }
    };

    const handleNewJobMessage = (msg) => {
      console.log('[Header] Received new_job_message:', msg);
      if (userInfo && String(msg.userId) === String(userInfo._id) && String(msg.senderId) !== String(userInfo._id)) {
        queryClient.invalidateQueries(['notifications']);
      }
    };

    if (userInfo && socket) {
      socket.on('new_notification', handleNewNotification);
      socket.on('new_job_message', handleNewJobMessage);
    }
    return () => {
      if (socket) {
        socket.off('new_notification', handleNewNotification);
        socket.off('new_job_message', handleNewJobMessage);
      }
    };
  }, [userInfo, queryClient]);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close mobile search when screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfile = () => {
    if (userInfo?.role === 'hireuser') {
      navigate('/hire/dashboard/profile');
    }
    setShowUserDropdown(false);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    navigate('/hire/notifications');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 ml-0 h-[70px] md:h-[80px] flex items-center bg-white px-3 sm:px-4 md:px-6 py-3 md:py-4 transition-all border-b border-slate-200 shadow-sm">
      {/* Left Section - Logo & Sidebar Toggle */}
      <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setShowSidebar(prev => !prev)}
          className="lg:hidden w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex justify-center items-center cursor-pointer text-slate-600 transition-all duration-200 active:scale-95"
        >
          {showSidebar ? (
            <span className="text-xl font-bold">✕</span>
          ) : (
            <FaList className="text-lg" />
          )}
        </button>


        {/* Logo & Brand */}
        <Link to="/hire/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img
            src={logo}
            alt="JeenoraHire"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              JEENORA
            </span>
            <span className="text-xl sm:text-3xl font-extrabold italic bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent ml-1 mb-1">Hire</span>
          </div>
        </Link>
      </div>

      {/* Center Section - Search Bar (Desktop) */}
      <div className="hidden lg:block flex-1 max-w-2xl mx-auto">
        <div className="relative group">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-blue-500 transition-colors" />
          <input
            className="pl-12 pr-4 py-3 w-full outline-none border border-slate-200 bg-slate-50/50 rounded-xl shadow-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm"
            type="text"
            name="search"
            placeholder="Search jobs, candidates, companies..."
          />
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        {/* Mobile Search Toggle */}
        <div className="lg:hidden">
          {searchOpen ? (
            <div className="absolute top-0 left-0 right-0 bg-white px-4 py-4 z-40 shadow-lg border-b border-slate-100">
              <div className="relative max-w-2xl mx-auto">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  className="pl-12 pr-12 py-3 w-full outline-none bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400"
                  type="text"
                  name="search"
                  placeholder="Search jobs..."
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={toggleSearch}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex justify-center items-center text-slate-600 transition-all duration-200 active:scale-95"
            >
              <FaSearch className="text-lg" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex justify-center items-center text-blue-600 transition-all duration-200 relative group active:scale-95"
          >
            <FaBell className="text-lg group-hover:scale-110 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 z-50 animate-fadeIn overflow-hidden">
              {/* Notification list */}
              <div className="flex justify-between items-center p-4 border-b border-slate-50 bg-white">
                <h3 className="font-bold text-slate-800">Notifications</h3>
                {notifications.length > 0 && (
                  <button onClick={() => deleteAllMutation.mutate()} className="text-xs text-red-500 hover:text-red-600 font-medium">
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">No new notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      onClick={() => {
                        markAsReadMutation.mutate(notification._id);
                        setShowNotifications(false);
                        navigate(notification.link || '/hire/notifications');
                      }}
                      className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs ${notification.type === 'job' ? 'bg-blue-500' : 'bg-gradient-to-r from-blue-500 to-emerald-500'}`}>
                        {notification.type === 'job' ? <FaBriefcase /> : <FaBell />}
                      </div>
                      <div>
                        <p className={`text-sm ${!notification.isRead ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{notification.title}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notification.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={handleViewAllNotifications}
                className="w-full text-center text-sm font-bold py-3 border-t border-slate-50 bg-slate-50/50 hover:bg-slate-100 transition-colors"
              >
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">View All</span>
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 pl-3 border-l border-slate-100">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[12px] font-black text-slate-800 tracking-tight uppercase leading-tight">
              {(profile?.personalDetails?.fullName || userInfo?.name || 'User').split(' ')[0]}
            </span>
          
          </div>
          <Link
            to="/hire/profile"
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:shadow-lg text-white flex items-center justify-center transition-all duration-200 border-2 border-blue-100 overflow-hidden shadow-sm active:scale-95"
            title="My Profile"
          >
            {(profile?.personalDetails?.profilePicture || profile?.user?.profileImageUrl || userInfo?.image || userInfo?.profileImageUrl) ? (
              <img
                src={profile?.personalDetails?.profilePicture || profile?.user?.profileImageUrl || userInfo?.image || userInfo?.profileImageUrl}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-sm">
                {(profile?.personalDetails?.fullName || userInfo?.name || 'U').charAt(0).toUpperCase()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

