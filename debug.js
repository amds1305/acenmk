
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
  
  // Vérifier les problèmes de cache
  console.log('🔎 Vérification des en-têtes de cache...');
  fetch(window.location.href, { method: 'HEAD' })
    .then(response => {
      const cacheControl = response.headers.get('Cache-Control');
      console.log(`📑 En-tête Cache-Control: ${cacheControl || 'non défini'}`);
    })
    .catch(err => {
      console.error('❌ Erreur lors de la vérification des en-têtes:', err);
    });
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
