
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log("Démarrage de l'application React...");

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
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
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
