import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function Home() {
  const { role } = useAuthStore((state) => state);

  if (role === 'hireuser') {
    return <Navigate to="/hire/dashboard" replace />;
  } else {
    return <Navigate to="/hire/login" replace />;
  }
}

export default Home;
