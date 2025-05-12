
import React from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';

// Import des routes
import routes from './lib/routes';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SectionsProvider } from './contexts/sections/SectionsContext';
import { PermissionsProvider } from './contexts/PermissionsContext';
import { Toaster } from './components/ui/toaster';

function App() {
  const routeElements = useRoutes(routes);
  
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <PermissionsProvider>
          <SectionsProvider>
            {routeElements}
            <Toaster />
          </SectionsProvider>
        </PermissionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
