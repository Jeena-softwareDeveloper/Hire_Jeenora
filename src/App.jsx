import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
import api from "./api/api";
import AppRoutes from "./router/AppRoutes.jsx";
import ScrollToTop from "./components/common/ScrollToTop";


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
          if (err.response?.status === 401) {
            logout();
          }
        });
    }
  }, [token, updateUser, logout]);

  return <AppRoutes />;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
