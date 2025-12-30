import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiLogOutCircle, BiChevronRight } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../store/Reducers/authReducer'; // REMOVED
import { getNav } from '../navigation';
import useAuthStore from '@/store/useAuthStore';
import { useGetProfile } from '@/hooks/useProfile';

const Sidebar = ({ showSidebar, setShowSidebar, collapsed, setCollapsed, isMobile }) => {
  // const dispatch = useDispatch(); // Removed
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  // Use React Query hook for profile data
  const { data: profileData } = useGetProfile();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const [allNav, setAllNav] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);


  // Load role-based navigation and filter by feature flags
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
      // If profile not loaded yet, hide feature flagged items
      navs = navs.filter(nav => !nav.featureFlag);
    }
    setAllNav(navs);
  }, [role, profileData]);

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [dispatch]);

  // Create preview
  // Create preview
  // const reader = new FileReader();
  // reader.onload = (e) => setImagePreview(e.target.result);
  // reader.readAsDataURL(file);

  // Hide sidebar if clicked outside (mobile only)
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
    // localStorage.removeItem("authToken"); // Handled by store
    // sessionStorage.removeItem("authToken"); // Handled by store
    setShowSidebar(false);
    navigate("/hire/login");
  };

  const sidebarWidth = collapsed ? "w-16" : "w-64";

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed lg:fixed top-0 left-0 h-full bg-white shadow-xl border-r border-green-200
        z-40 flex flex-col transition-all duration-300
        ${sidebarWidth}
        ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >

      {/* Collapse Button (DESKTOP ONLY) */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-3 -right-3 p-1 bg-green-800 text-white rounded-full shadow-md hover:bg-green-700 transition"
        >
          <BiChevronRight className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      )}



      {/* NAVIGATION */}
      <div className="flex-1 lg:mt-24 mt-18  overflow-y-auto p-3 space-y-1">
        {allNav.map(nav => (
          <div key={nav.id}>

            {/* SINGLE LINK */}
            {!nav.children ? (
              <Link
                to={nav.path}
                onClick={(e) => {
                  if (isMobile) setShowSidebar(false);
                  if (isActiveLink(nav.path)) {
                    e.preventDefault();
                    window.location.href = nav.path; // Force reload
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActiveLink(nav.path)
                    ? "bg-green-700 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-100"}
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <span className="text-xl">{nav.icon}</span>
                {!collapsed && <span>{nav.title}</span>}
              </Link>
            ) : (
              <>
                {/* DROPDOWN BUTTON */}
                <button
                  onClick={() => toggleDropdown(nav.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all
                    ${isActiveLink(nav.path)
                      ? "bg-green-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-green-100"}
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{nav.icon}</span>
                    {!collapsed && <span>{nav.title}</span>}
                  </div>

                  {!collapsed && (
                    <IoIosArrowDown
                      className={`transition-transform ${openDropdown === nav.id ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* DROPDOWN CHILDREN */}
                {!collapsed && openDropdown === nav.id && (
                  <div className="ml-6 mt-2 pl-3 border-l border-green-300 space-y-2">
                    {nav.children.map(child => (
                      <Link
                        key={child.id}
                        to={child.path}
                        onClick={() => isMobile && setShowSidebar(false)}
                        className={`block text-sm py-2 rounded-md
                          ${isActiveLink(child.path)
                            ? "text-green-700 font-semibold"
                            : "text-gray-600 hover:text-green-700"}
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
      </div>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-green-200">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 gap-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
        >
          <BiLogOutCircle className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
