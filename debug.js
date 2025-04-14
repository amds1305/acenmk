
// Script de débogage pour afficher les erreurs React et vérifier le chargement
console.log('🔍 Debug script is loading...');

window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Debug script loaded successfully!');
  
  // Vérification de l'élément root
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("❌ L'élément #root n'a pas été trouvé dans le document");
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
  } else {
    console.log('✅ Élément #root trouvé');
  }
});

// Gestionnaire global des erreurs
window.onerror = function(message, source, lineno, colno, error) {
  console.error('🚨 Erreur globale détectée:', { message, source, lineno, colno, error });
  return false;
};

console.log('🏁 Debug script fully initialized');
