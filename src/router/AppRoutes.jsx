import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HireRoutes } from "./routes/HireRoutes";

const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    }>
      <Routes>
        {HireRoutes.map((route) => {
          if (route.children) {
            return (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element}
              >
                {route.children.map((child) => (
                  <Route
                    key={child.path || 'index'}
                    index={child.index}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            );
          }
          
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
