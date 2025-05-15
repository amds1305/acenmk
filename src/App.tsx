
import React from 'react';
import { Routes, Route, useRoutes, Outlet } from 'react-router-dom';
import Index from './pages/Index';
import routes from './lib/routes';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/sections/SectionsContext';
import { HeaderProvider } from './contexts/HeaderContext';
import { Toaster } from './components/ui/toaster';

function App() {
  const routeElements = useRoutes(routes);
  
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <HeaderProvider>
          <SectionsProvider>
            {routeElements}
            <Toaster />
          </SectionsProvider>
        </HeaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
