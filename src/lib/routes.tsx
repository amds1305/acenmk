
import React from 'react';
import Index from '@/pages/Index';
import { Navigate } from 'react-router-dom';
import Portfolio from '@/pages/Portfolio';
import { PUBLIC_ROUTES } from './routes/publicRoutes';

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  // Ajout des routes pour les pages statiques
  {
    path: '/a-propos',
    element: <Navigate to="/#about" replace />,
  },
  {
    path: '/services',
    element: <Navigate to="/#services" replace />,
  },
  {
    path: '/contact',
    element: <Navigate to="/#contact" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
];

export default routes;
