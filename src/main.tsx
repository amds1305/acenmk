
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log("Démarrage de l'application React...");

// Fonction simplifiée pour le rendu
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Élément racine #root non trouvé!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Rendu React réussi!");
    
    // Supprimer le message de chargement s'il existe
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  } catch (error) {
    console.error("Erreur de rendu React:", error);
    
    // Afficher l'erreur de façon visible
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
