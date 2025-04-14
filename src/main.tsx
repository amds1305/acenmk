
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/animations.css";

// Journaliser au démarrage pour aider au débogage
console.log("Application en cours de démarrage...");

// Trouver l'élément racine où React va monter l'application
const rootElement = document.getElementById("root");

// Journaliser l'état de l'élément racine
console.log("Élément racine trouvé:", rootElement ? "Oui" : "Non");

// Seulement rendre si l'élément racine existe
if (rootElement) {
  try {
    // Créer une racine React
    const root = ReactDOM.createRoot(rootElement);
    
    // Rendre l'application
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Application rendue avec succès");
  } catch (error) {
    console.error("Erreur lors du rendu de l'application:", error);
  }
} else {
  console.error("Élément racine non trouvé!");
}
