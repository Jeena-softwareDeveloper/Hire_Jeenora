import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import api from "./api/api";
import AppRoutes from "./router/AppRoutes.jsx";

const AppContent = () => {
  const token = useAuthStore((state) => state.token);
  const updateUser = useAuthStore((state) => state.updateUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (token) {
      api.get('/hire/user/profile', { withCredentials: true })
        .then(({ data }) => {
          updateUser(data.userInfo || data.user);
        })
        .catch((err) => {
          console.log("Failed to fetch user info", err);
          logout();
        });
    }
  }, [token, updateUser, logout]);

  return <AppRoutes />;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;