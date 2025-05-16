
import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './lib/routes';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { HeaderProvider } from './contexts/HeaderContext';
import { SectionsProvider } from './contexts/sections/SectionsContext';
import { Toaster } from './components/ui/toaster';

function App() {
  const routeElements = useRoutes(routes);
  
  return (
    <ThemeProvider defaultTheme="light">
      <HeaderProvider>
        <SectionsProvider>
          {routeElements}
          <Toaster />
        </SectionsProvider>
      </HeaderProvider>
    </ThemeProvider>
  );
}

export default App;
