import React, { useState, useRef, useEffect } from 'react';
import { FaList, FaSearch, FaBell, FaUser, FaChevronDown, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import useAuthStore from '../store/useAuthStore';
import { socket } from '../utils/utils';
import { useGetNotifications, useMarkNotificationRead, useDeleteAllNotifications } from '../hooks/useNotifications';
import { useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';

const Header = ({ showSidebar, setShowSidebar }) => {
  const userInfo = useAuthStore((state) => state.userInfo);
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
    <header className="fixed top-0 left-0 right-0 z-50 ml-0 h-[70px] md:h-[80px] flex items-center bg-gradient-to-r from-green-900 to-green-700 px-3 sm:px-4 md:px-6 py-3 md:py-4 transition-all shadow-lg border-b border-green-200/20">
      {/* Left Section - Logo & Sidebar Toggle */}
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6 flex-shrink-0">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setShowSidebar(prev => !prev)}
          className="lg:hidden w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 shadow-md flex justify-center items-center cursor-pointer text-white transition-all duration-200 hover:scale-105"
        >
          {showSidebar ? (
            <span className="text-2xl font-bold">✕</span>
          ) : (
            <FaList className="text-lg" />
          )}
        </button>


        {/* Logo & Brand */}
        <div className="flex items-center gap-0">
          <img
            src={logo}
            alt="JeenoraHire"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
          />
          <div className="block">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight whitespace-nowrap">
              JeenoraHire
            </h1>
            {userInfo?.name && (
              <p className="text-green-100 text-sm md:text-base hidden lg:block">
                Welcome back, {userInfo.name}!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Center Section - Search Bar (Desktop) */}
      <div className="hidden lg:block flex-1 max-w-2xl mx-8 xl:mx-12">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-800 text-lg" />
          <input
            className="pl-12 pr-4 py-3 w-full outline-none border bg-white border-green-800 rounded-xl text-gray-700 placeholder-green-900 focus:bg-white transition-all duration-300 shadow-sm text-base"
            type="text"
            name="search"
            placeholder="Search jobs, candidates, companies..."
          />
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5 ml-auto">
        {/* Mobile Search Toggle */}
        <div className="lg:hidden">
          {searchOpen ? (
            <div className="absolute top-0 left-0 right-0 bg-green-600 px-4 py-4 z-40 shadow-lg">
              <div className="relative max-w-2xl mx-auto">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                <input
                  className="pl-12 pr-12 py-3 w-full outline-none border bg-white border-green-300 rounded-lg text-gray-700 placeholder-green-600 focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-base"
                  type="text"
                  name="search"
                  placeholder="Search jobs..."
                  autoFocus
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 text-xl font-semibold"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={toggleSearch}
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/20 hover:bg-white/30 flex justify-center items-center text-white transition-all duration-200 hover:scale-110"
            >
              <FaSearch className="text-lg md:text-xl" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/20 hover:bg-white/30 flex justify-center items-center text-white transition-all duration-200 hover:scale-110 relative"
          >
            <FaBell className="text-lg md:text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse text-xs md:text-sm font-semibold">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fadeIn">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Notifications</h3>
                  <p className="text-sm text-gray-600">{unreadCount} unread</p>
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={() => deleteAllMutation.mutate()}
                    className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-gray-500 text-sm">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      onClick={() => {
                        markAsReadMutation.mutate(notification._id);
                        setShowNotifications(false);
                        if (notification.link) {
                          navigate(notification.link);
                        } else {
                          navigate('/hire/notifications');
                        }
                      }}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 ${!notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-white'
                        }`}
                    >
                      {/* Icon/Avatar Placeholder */}
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${notification.type === 'job' ? 'bg-blue-500' : 'bg-green-500'}`}>
                          {notification.type === 'job' ? <FaBriefcase size={14} /> : <FaBell size={14} />}
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className={`text-sm ${!notification.isRead ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{notification.title}</p>
                        <p className="text-sm text-slate-500 line-clamp-2">{notification.message || notification.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={handleViewAllNotifications}
                  className="w-full text-center text-sm text-green-600 hover:text-green-700 font-semibold py-2"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile - Icon Only, Click to Navigate */}
        <div className="relative block">
          <button
            onClick={() => navigate('/hire/profile')}
            className="flex items-center gap-2 md:gap-4 p-2 rounded-lg hover:bg-white/20 transition-all duration-200 group"
            title="My Profile"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              {/* Fallback Initial (Always rendered, acts as background/fallback) */}
              <div className="w-full h-full rounded-full border-2 border-white/50 group-hover:border-white transition-all duration-200 shadow-lg bg-green-500 flex items-center justify-center text-white font-semibold text-base md:text-lg">
                {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
              </div>

              {/* Profile Image (Overlays fallback if available) */}
              {(userInfo?.image || userInfo?.profileImageUrl) && (
                <img
                  className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-white/50 group-hover:border-white transition-all duration-200 shadow-lg object-cover"
                  src={userInfo.image || userInfo.profileImageUrl}
                  alt="User"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}

              {/* Status Dot */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 border-2 border-white rounded-full z-10"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
