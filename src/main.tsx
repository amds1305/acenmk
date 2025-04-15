
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log("Initialisation de React en cours...");

// Fonction pour rendre l'application
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Élément racine #root non trouvé!");
    return;
  }
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
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
    
    rootElement.appendChild(errorElement);
  }
}

// S'assurer que le DOM est complètement chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // Le DOM est déjà chargé, on peut rendre l'application
  setTimeout(renderApp, 0);
}
