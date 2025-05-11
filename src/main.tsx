
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import { queryClient } from './lib/queryClient';
import { AdminNotificationProvider } from './hooks/admin-notification';
import { PermissionsProvider } from './contexts/PermissionsContext';

console.log("Démarrage de l'application React...");

// Add error boundary for the entire app
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
          <div className="p-6 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Une erreur est survenue</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              L'application a rencontré une erreur. Veuillez recharger la page ou contacter l'assistance si l'erreur persiste.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs overflow-auto max-h-40 mb-4">
              {this.state.error?.toString()}
            </pre>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Fonction pour le rendu de l'application
const renderApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Élément racine #root non trouvé!");
    return;
  }
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <PermissionsProvider>
              <AdminNotificationProvider>
                <App />
              </AdminNotificationProvider>
            </PermissionsProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    );
    console.log("Application React rendue avec succès!");
    
    // Supprimer le message de chargement s'il existe
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  } catch (error) {
    console.error("Erreur lors du rendu de React:", error);
    
    // Afficher un message d'erreur visible
    const errorElement = document.createElement('div');
    errorElement.style.padding = '20px';
    errorElement.style.backgroundColor = '#ffdddd';
    errorElement.style.color = '#990000';
    errorElement.style.margin = '20px';
    errorElement.style.borderRadius = '5px';
    errorElement.innerHTML = `
      <h2>Erreur de rendu React</h2>
      <p>${error instanceof Error ? error.message : String(error)}</p>
    `;
    
    if (rootElement) {
      rootElement.appendChild(errorElement);
    }
  }
};

// Exécuter le rendu immédiatement
renderApp();
