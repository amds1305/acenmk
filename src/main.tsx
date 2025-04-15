
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/animations.css";

// Journaliser au démarrage pour aider au débogage
console.log("Application en cours de démarrage...");

// Fonction d'initialisation sécurisée
function initApp() {
  try {
    // Trouver l'élément racine où React va monter l'application
    const rootElement = document.getElementById("root");
    
    // Journaliser l'état de l'élément racine
    console.log("Élément racine trouvé:", rootElement ? "Oui" : "Non");
    
    // Seulement rendre si l'élément racine existe
    if (rootElement) {
      // Créer une racine React
      const root = ReactDOM.createRoot(rootElement);
      
      // Rendre l'application
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log("Application rendue avec succès");
    } else {
      console.error("Élément racine non trouvé!");
      // Créer un élément d'erreur visible si l'élément racine n'existe pas
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '0';
      errorDiv.style.left = '0';
      errorDiv.style.right = '0';
      errorDiv.style.backgroundColor = '#ffcccc';
      errorDiv.style.color = '#990000';
      errorDiv.style.padding = '20px';
      errorDiv.style.zIndex = '9999';
      errorDiv.innerHTML = "Erreur critique : L'élément #root est manquant";
      document.body.appendChild(errorDiv);
    }
  } catch (error) {
    console.error("Erreur lors du rendu de l'application:", error);
    // Afficher une erreur visible en cas d'échec
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.right = '0';
    errorDiv.style.backgroundColor = '#ffcccc';
    errorDiv.style.color = '#990000';
    errorDiv.style.padding = '20px';
    errorDiv.style.zIndex = '9999';
    errorDiv.innerHTML = "Erreur lors du rendu: " + String(error);
    document.body.appendChild(errorDiv);
  }
}

// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
