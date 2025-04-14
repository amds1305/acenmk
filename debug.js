
// Script de débogage pour afficher les erreurs React
window.onerror = function(message, source, lineno, colno, error) {
  // Créer un élément visible pour afficher l'erreur
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.backgroundColor = '#ffcccc';
  errorDiv.style.color = '#990000';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.fontFamily = 'monospace';
  errorDiv.style.fontSize = '14px';
  errorDiv.style.border = '2px solid #990000';
  
  // Ajouter les détails de l'erreur
  errorDiv.innerHTML = `
    <h3>Erreur JavaScript</h3>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Ligne:</strong> ${lineno}, <strong>Colonne:</strong> ${colno}</p>
    <p><strong>Stack trace:</strong> ${error ? error.stack : 'Non disponible'}</p>
  `;
  
  // Ajouter l'élément à la page
  document.body.appendChild(errorDiv);
  
  // Ne pas empêcher le comportement par défaut de l'erreur
  return false;
};

// S'assurer que le document est bien chargé
document.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("L'élément #root n'a pas été trouvé dans le document");
    alert("Erreur critique: L'élément #root n'a pas été trouvé");
  } else {
    console.log("L'élément #root a été trouvé avec succès");
  }
});

// Vérifier si les scripts sont bien chargés
const scripts = document.querySelectorAll('script');
console.log('Scripts chargés:', scripts.length);
scripts.forEach((script, index) => {
  console.log(`Script ${index}:`, script.src || 'Inline script');
});

console.log('Debug script loaded successfully');
