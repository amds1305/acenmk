
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
  
  // Vérification du localStorage
  try {
    const testKey = 'debug-test';
    localStorage.setItem(testKey, 'test');
    const testValue = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    console.log('✅ localStorage fonctionne correctement');
  } catch (error) {
    console.error('❌ Erreur avec localStorage:', error);
  }
  
  // Vérification des scripts chargés
  const scripts = document.querySelectorAll('script');
  console.log(`✅ ${scripts.length} scripts sont chargés`);
  scripts.forEach(script => {
    console.log(`Script: ${script.src || 'inline script'}`);
  });
});

// Gestionnaire global des erreurs
window.onerror = function(message, source, lineno, colno, error) {
  console.error('🚨 Erreur globale détectée:', { message, source, lineno, colno, error });
  return false;
};

// Surveiller les erreurs de récupération
window.addEventListener('unhandledrejection', function(event) {
  console.error('🚨 Promise rejetée non gérée:', event.reason);
});

console.log('🏁 Debug script fully initialized');
