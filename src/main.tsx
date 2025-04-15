
// Ensure this is a regular script, not a module
console.log("Application en cours de démarrage...");

// Importer React manuellement (sera attaché à window)
document.addEventListener("DOMContentLoaded", function() {
  try {
    console.log("DOM chargé, initialisation de l'application...");
    
    // Trouver l'élément racine
    const rootElement = document.getElementById("root");
    console.log("État de l'élément racine:", rootElement ? "Trouvé" : "Non trouvé");
    
    if (!rootElement) {
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
      console.error("Élément racine #root non trouvé!");
    } else {
      console.log("Élément root trouvé, chargement des scripts React...");
      
      // Charger React manuellement
      const reactScript = document.createElement("script");
      reactScript.src = "https://unpkg.com/react@18/umd/react.development.js";
      reactScript.onload = function() {
        console.log("React chargé avec succès");
        
        // Charger ReactDOM après React
        const reactDomScript = document.createElement("script");
        reactDomScript.src = "https://unpkg.com/react-dom@18/umd/react-dom.development.js";
        reactDomScript.onload = function() {
          console.log("ReactDOM chargé avec succès");
          
          // Afficher un message simple pour confirmer que tout fonctionne
          rootElement.innerHTML = `
            <div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; text-align: center;">
              <h1>ESN Showcase Garden</h1>
              <p>L'application React sera chargée ici.</p>
              <p>Correction des problèmes de MIME-type en cours...</p>
            </div>
          `;
        };
        document.head.appendChild(reactDomScript);
      };
      document.head.appendChild(reactScript);
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation:", error);
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
    errorDiv.innerHTML = "Erreur lors du rendu: " + (error instanceof Error ? error.message : String(error));
    document.body.appendChild(errorDiv);
  }
});
