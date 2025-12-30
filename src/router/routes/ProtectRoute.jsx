import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

const ProtectRoute = ({ children, routeRole }) => {
  const { userInfo } = useAuthStore((state) => state);
  const location = useLocation();

  const currentUser = userInfo;
  let currentRole = currentUser?.role?.toLowerCase().replace(/_|-/g, '');
  if (currentRole === 'jobseeker' || currentRole === 'hire' || currentRole === 'hireuser') {
    currentRole = 'hireuser';
  }

  const routeRoleNormalized = routeRole?.toLowerCase();

  // If no user found, redirect to login
  if (!currentUser) {
    return <Navigate to="/hire/login" state={{ from: location }} replace />;
  }

  // Check if user role matches route role
  if (routeRoleNormalized && currentRole !== routeRoleNormalized) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized
  return children;
};

export default ProtectRoute;