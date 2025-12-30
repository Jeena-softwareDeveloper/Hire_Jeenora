import { lazy } from "react";
import HireLogin from "../../Pages/HireLogin";
const HireRegister = lazy(() => import('../../Pages/HireRegister'))
const Home = lazy(() => import('../../Pages/Home'))
const UnAuthorized = lazy(() => import('../../Pages/UnAuthorized'))
const Success = lazy(() => import('../../Pages/Success'))
const ForgotPassword = lazy(() => import('../../Pages/ForgotPassword'))
const ResetPassword = lazy(() => import('../../Pages/ResetPassword'))
const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/hireregister',
        element: <HireRegister />
    },
    {
        path: '/hirelogin',
        element: <HireLogin />
    },
    {
        path: '/unauthorized',
        element: <UnAuthorized />
    },
    {
        path: '/success?',
        element: <Success />
    },
    {
        path: '/hire/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/hire/reset-password',
        element: <ResetPassword />
    }
]

export default publicRoutes