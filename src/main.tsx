
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/animations.css";

// Console logs pour débugger
console.log("Application en cours de démarrage...");

// Fonction d'initialisation simplifiée pour éviter les erreurs de syntaxe
function initApp() {
  try {
    // Trouver l'élément racine
    const rootElement = document.getElementById("root");
    
    console.log("État de l'élément racine:", rootElement ? "Trouvé" : "Non trouvé");
    
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log("Application rendue avec succès");
    } else {
      console.error("Élément racine #root non trouvé!");
      // Afficher un message d'erreur visible
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
    }
  } catch (error) {
    console.error("Erreur lors du rendu:", error);
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
    errorDiv.innerHTML = "Erreur lors du rendu: " + String(error);
    document.body.appendChild(errorDiv);
  }
}

// Vérifier si le DOM est chargé
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
