
// Script de débogage avancé pour identifier les problèmes de chargement
console.log('🔎 Debug script is loading...');

// Fonction pour afficher un message d'erreur visible sur la page
function showVisibleError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.backgroundColor = '#ffcccc';
  errorDiv.style.color = '#990000';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '9999';
  errorDiv.innerHTML = message;
  document.body.appendChild(errorDiv);
  console.error(message);
}

// Vérifier si le script s'exécute correctement
window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Debug script loaded successfully!');
  
  // Vérification de l'élément root
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    showVisibleError("❌ L'élément #root n'a pas été trouvé dans le document");
  } else {
    console.log('✅ Élément #root trouvé');
    
    // Vérifier si l'élément est vide
    if (rootElement.children.length === 0) {
      console.warn('⚠️ L\'élément #root est vide, l\'application n\'a peut-être pas été rendue');
    }
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
  console.log(`📜 ${scripts.length} scripts sont chargés`);
  scripts.forEach((script, index) => {
    const src = script.src || 'inline script';
    const type = script.type || 'no type';
    console.log(`Script ${index + 1}: ${src} (type: ${type})`);
    
    // Vérifier les scripts critiques
    if (src.includes('main.tsx') || src.includes('main.js')) {
      console.log(`✓ Script principal trouvé: ${src}`);
    }
  });
  
  // Créer une page de secours basique si l'application ne se charge pas
  setTimeout(() => {
    if (rootElement && rootElement.children.length === 0) {
      showVisibleError(`
        <h2>Problème de chargement de l'application</h2>
        <p>L'application n'a pas pu se charger correctement. Voici quelques informations utiles:</p>
        <ul>
          <li>Navigateur: ${navigator.userAgent}</li>
          <li>URL: ${window.location.href}</li>
          <li>Date/heure: ${new Date().toLocaleString()}</li>
        </ul>
        <p>Essayez de vider le cache de votre navigateur et de recharger la page.</p>
        <button onclick="window.location.reload(true)" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Recharger la page
        </button>
      `);
    }
  }, 5000);
});

// Gestionnaire global des erreurs
window.onerror = function(message, source, lineno, colno, error) {
  showVisibleError(`🚨 Erreur JavaScript: ${message}<br>Source: ${source}<br>Ligne: ${lineno}, Colonne: ${colno}`);
  return false;
};

// Surveiller les erreurs de récupération
window.addEventListener('unhandledrejection', function(event) {
  showVisibleError(`🚨 Promise rejetée non gérée: ${event.reason}`);
});

console.log('🏁 Debug script fully initialized');
