
import React from 'react';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Contact from '@/pages/Contact';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  // Routes for static pages with their own components
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
];

export default routes;
