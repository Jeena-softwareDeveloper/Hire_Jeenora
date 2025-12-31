import React, { lazy } from 'react';

const Home = lazy(() => import('../../static_page/Home/Home'));
const HowItWorks = lazy(() => import('../../static_page/HowItWorks/HowItWorks'));
const JobsPreview = lazy(() => import('../../static_page/Jobs/Jobs'));
const Pricing = lazy(() => import('../../static_page/Pricing/Pricing'));
const About = lazy(() => import('../../static_page/About/About'));
const FAQ = lazy(() => import('../../static_page/FAQ/FAQ'));
const Contact = lazy(() => import('../../static_page/Contact/Contact'));
const StaticLayout = lazy(() => import('../../static_page/StaticLayout/StaticLayout'));

const staticRoutes = [
    {
        path: '/',
        element: <StaticLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'how-it-works',
                element: <HowItWorks />
            },
            {
                path: 'jobs-preview',
                element: <JobsPreview />
            },
            {
                path: 'pricing',
                element: <Pricing />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'faq',
                element: <FAQ />
            },
            {
                path: 'contact',
                element: <Contact />
            }
        ]
    }
];

export default staticRoutes;
