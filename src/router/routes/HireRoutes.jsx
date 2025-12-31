import { lazy } from "react";
import HireLogin from "../../Pages/HireLogin";
import HireRegister from "../../Pages/HireRegister";
import UnAuthorized from "../../Pages/UnAuthorized";
import MainLayout from "../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";
import { Navigate } from "react-router-dom";

const Resume = lazy(() => import("../../Pages/Resume"));
const Payments = lazy(() => import("../../Pages/Payments"));
const Profile = lazy(() => import("../../Pages/Profile"));
const HireDashboard = lazy(() => import("../../Pages/HireDashboard"));
const Jobs = lazy(() => import("../../Pages/Jobs"));
const JobDetails = lazy(() => import("../../Pages/JobDetails"));
const MyApplications = lazy(() => import("../../Pages/MyApplications"));
const SavedJobs = lazy(() => import("../../Pages/SavedJobs"));
const Notifications = lazy(() => import("../../Pages/Notifications"));
const SellerToAdmin = lazy(() => import("../../Pages/SellerToAdmin"));
const JobTracking = lazy(() => import("../../Pages/JobTracking"));
const AdminChat = lazy(() => import("../../Pages/AdminChat"));
const AdminCreditSettings = lazy(() => import("../../Pages/AdminCreditSettings"));
const PaymentVerify = lazy(() => import("../../Pages/PaymentVerify"));
const ForgotPassword = lazy(() => import("../../Pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../../Pages/ResetPassword"));


const Home = lazy(() => import("../../static_page/Home/Home"));
const HowItWorks = lazy(() => import("../../static_page/HowItWorks/HowItWorks"));
const JobsPreview = lazy(() => import("../../static_page/Jobs/Jobs"));
const Pricing = lazy(() => import("../../static_page/Pricing/Pricing"));
const About = lazy(() => import("../../static_page/About/About"));
const FAQ = lazy(() => import("../../static_page/FAQ/FAQ"));
const Contact = lazy(() => import("../../static_page/Contact/Contact"));
const StaticLayout = lazy(() => import("../../static_page/StaticLayout/StaticLayout"));


export const HireRoutes = [
  // --- STATIC / PUBLIC PAGES ---
  {
    path: "/",
    element: <StaticLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "jobs-preview",
        element: <JobsPreview />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  // --- AUTH ROUTES ---
  {
    path: "/hire/login",
    element: <HireLogin />,
  },
  {
    path: "/hire/register",
    element: <HireRegister />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "/hire/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/hire/reset-password",
    element: <ResetPassword />,
  },

  // Admin Routes - Protected by 'admin' role
  {
    path: "/hire/admin",
    element: (
      <ProtectRoute routeRole="admin">
        <MainLayout />
      </ProtectRoute>
    ),
    children: [
      {
        path: "chat",
        element: <AdminChat />,
      },
      {
        path: "settings",
        element: <AdminCreditSettings />,
      },
      // Redirect to chat if index
      {
        index: true,
        element: <Navigate to="/hire/admin/chat" replace />
      }
    ],
  },

  // Protected Routes - Protect ONLY the MainLayout, not individual routes
  {
    path: "/hire",
    element: (
      <ProtectRoute routeRole="hireuser">
        <MainLayout />
      </ProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/hire/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <HireDashboard />,
      },

      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "payments",
        element: <Payments />
      },
      {
        path: "payments/verify",
        element: <PaymentVerify />
      },
      {
        path: "resume",
        element: <Resume />
      },
      {
        path: "jobs",
        element: <Jobs />
      },
      {
        path: "jobs/:id",
        element: <JobDetails />
      },
      {
        path: "notifications",
        element: <Notifications />
      },
      {
        path: "saved",
        element: <SavedJobs />
      },
      {
        path: "applications",
        element: <MyApplications />
      },
      {
        path: "tracking/:id",
        element: <JobTracking />
      },
      {
        path: "support",
        element: <SellerToAdmin />
      },
      {
        path: "*",
        element: <Navigate to="/hire/dashboard" replace />,
      },
    ],
  },

  // Catch all route - Redirect to Home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];