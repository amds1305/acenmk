
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialiser l'application React proprement
document.addEventListener("DOMContentLoaded", function() {
  try {
    console.log("DOM chargé, initialisation de l'application React...");
    
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("Élément racine #root non trouvé!");
      const errorDiv = document.createElement("div");
      errorDiv.style.position = "fixed";
      errorDiv.style.top = "0";
      errorDiv.style.left = "0";
      errorDiv.style.right = "0";
      errorDiv.style.backgroundColor = "#ffcccc";
      errorDiv.style.color = "#990000";
      errorDiv.style.padding = "20px";
      errorDiv.style.zIndex = "9999";
      errorDiv.innerHTML = "Erreur: L'élément #root est manquant dans le document HTML";
      document.body.appendChild(errorDiv);
      return;
    }
    
    // Créer la racine React et rendre l'application
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log("Application React rendue avec succès!");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de React:", error);
    // Afficher l'erreur à l'utilisateur
    const errorDiv = document.createElement("div");
    errorDiv.style.position = "fixed";
    errorDiv.style.top = "0";
    errorDiv.style.left = "0";
    errorDiv.style.right = "0";
    errorDiv.style.backgroundColor = "#ffcccc";
    errorDiv.style.color = "#990000";
    errorDiv.style.padding = "20px";
    errorDiv.style.zIndex = "9999";
    errorDiv.innerHTML = "Erreur lors du rendu de l'application: " + 
      (error instanceof Error ? error.message : String(error));
    document.body.appendChild(errorDiv);
  }
});
