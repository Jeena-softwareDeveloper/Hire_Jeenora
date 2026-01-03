import { privateRoutes } from './privateRoutes';
import ProtectRoute from './ProtectRoute';

export const getRoutes = () => {
  return privateRoutes.map(route => ({
    ...route,
    element: <ProtectRoute route={route}>{route.element}</ProtectRoute>
  }));
};
