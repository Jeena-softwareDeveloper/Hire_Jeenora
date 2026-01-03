import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HireRoutes } from "./routes/HireRoutes";
import ProtectRoute from "./routes/ProtectRoute";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {HireRoutes.map((route) =>
          route.children ? (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={
                    child.role ? (
                      <ProtectRoute routeRole={child.role}>
                        {child.element}
                      </ProtectRoute>
                    ) : (
                      child.element
                    )
                  }
                />
              ))}
            </Route>
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.role ? (
                  <ProtectRoute routeRole={route.role}>
                    {route.element}
                  </ProtectRoute>
                ) : (
                  route.element
                )
              }
            />
          )
        )}

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/hire/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

