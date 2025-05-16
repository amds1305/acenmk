
import React from 'react';
import Index from '@/pages/Index';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
];

export default routes;
