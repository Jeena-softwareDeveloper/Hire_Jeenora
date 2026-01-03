import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOutCircle, BiChevronRight } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { getNav } from '../navigation';
import useAuthStore from '@/store/useAuthStore';
import { useGetProfile } from '@/hooks/useProfile';

const Sidebar = ({ showSidebar, setShowSidebar, collapsed, setCollapsed, isMobile }) => {
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  const { data: profileData } = useGetProfile();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const [allNav, setAllNav] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    let navs = getNav(role);
    if (profileData) {
      navs = navs.filter(nav => {
        if (nav.featureFlag) {
          return profileData[nav.featureFlag] === true;
        }
        return true;
      });
    } else {
      navs = navs.filter(nav => !nav.featureFlag);
    }
    setAllNav(navs);
  }, [role, profileData]);

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, setShowSidebar]);

  const toggleDropdown = useCallback((id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  }, [openDropdown]);

  const isActiveLink = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  const handleLogout = async () => {
    await logout();
    setShowSidebar(false);
    navigate("/hire/login");
  };

  const sidebarWidth = collapsed ? "w-20" : "w-48";

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed lg:fixed top-0 left-0 h-full 
        bg-slate-50 border-r border-slate-200
        z-40 flex flex-col transition-all duration-300
        ${sidebarWidth}
        ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >

      {/* Collapse Button (DESKTOP ONLY) */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-24 -right-3 p-1.5 bg-white border border-slate-100 text-emerald-600 rounded-full shadow-md hover:bg-slate-50 transition z-50"
        >
          <BiChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      )}

      {/* NAVIGATION */}
      <div className="flex-1 lg:mt-[85px] mt-[75px] overflow-y-auto px-4 py-6 space-y-1.5 no-scrollbar">
        {allNav.map(nav => (
          <div key={nav.id}>
            {!nav.children ? (
              <Link
                to={nav.path}
                onClick={() => isMobile && setShowSidebar(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden
                  ${isActiveLink(nav.path)
                    ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-emerald-600 hover:translate-x-1"}
                  ${collapsed ? "justify-center px-2" : ""}
                  active:scale-95
                `}
              >
                <span className={`text-xl transition-transform duration-300 ${isActiveLink(nav.path) ? "text-white scale-110" : "text-slate-400 group-hover:text-emerald-500 group-hover:scale-110"}`}>{nav.icon}</span>
                {!collapsed && <span className="font-medium text-sm tracking-wide">{nav.title}</span>}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleDropdown(nav.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActiveLink(nav.path)
                      ? "bg-slate-50 text-emerald-700 font-semibold"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 hover:translate-x-1"}
                    ${collapsed ? "justify-center px-2" : ""}
                    active:scale-95
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl transition-transform duration-300 ${isActiveLink(nav.path) ? "text-emerald-600 scale-110" : "text-slate-400 group-hover:text-emerald-500 group-hover:scale-110"}`}>{nav.icon}</span>
                    {!collapsed && <span className="font-medium text-sm tracking-wide">{nav.title}</span>}
                  </div>

                  {!collapsed && (
                    <IoIosArrowDown
                      className={`transition-transform duration-200 ${openDropdown === nav.id ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {!collapsed && openDropdown === nav.id && (
                  <div className="ml-4 mt-1 pl-4 border-l-2 border-slate-100 space-y-1">
                    {nav.children.map(child => (
                      <Link
                        key={child.id}
                        to={child.path}
                        onClick={() => isMobile && setShowSidebar(false)}
                        className={`block text-sm py-2 px-3 rounded-md transition-all duration-200
                          ${isActiveLink(child.path)
                            ? "text-emerald-600 font-semibold bg-emerald-50 translate-x-1"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:translate-x-1"}
                          active:scale-95
                        `}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* Explicit Logout Button at end of list */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-slate-500 hover:bg-red-50 hover:text-red-600 w-full mt-8 group
              ${collapsed ? "justify-center px-2" : ""}
              hover:translate-x-1 active:scale-95
            `}
        >
          <span className="text-xl text-slate-400 group-hover:text-red-500"><BiLogOutCircle /></span>
          {!collapsed && <span className="font-medium text-sm tracking-wide">Log Out</span>}
        </button>

      </div>
    </div>
  );
};

export default Sidebar;

