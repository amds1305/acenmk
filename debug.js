
// Script de débogage avancé pour identifier les problèmes de chargement
console.log('🔎 Debug script is loading...');

// Fonction pour afficher un message d'erreur visible sur la page
function showVisibleError(message, isJson = false) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.right = '0';
  errorDiv.style.backgroundColor = '#ffcccc';
  errorDiv.style.color = '#990000';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.maxHeight = '90vh';
  errorDiv.style.overflow = 'auto';
  
  if (isJson) {
    try {
      const formatted = JSON.stringify(JSON.parse(message), null, 2);
      errorDiv.innerHTML = `<pre style="white-space: pre-wrap;">${formatted}</pre>`;
    } catch {
      errorDiv.innerHTML = message;
    }
  } else {
    errorDiv.innerHTML = message;
  }
  
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
    setTimeout(() => {
      if (rootElement.children.length === 0) {
        console.warn('⚠️ L\'élément #root est toujours vide après 2 secondes, l\'application n\'a peut-être pas été rendue');
        showVisibleError(`
          <h2>Application non rendue</h2>
          <p>L'application ne s'est pas chargée correctement. Vérifiez la console du navigateur pour plus de détails.</p>
          <p>Vérification des erreurs en cours...</p>
          <button onclick="window.location.reload(true)" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Recharger la page
          </button>
          <button onclick="window.location.href='/fallback.html'" style="margin-left: 10px; padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Page de secours
          </button>
        `);

        // Tenter d'afficher le statut du chargement des modules
        try {
          fetch('/src/main.tsx')
            .then(response => response.text())
            .then(text => {
              console.log("✓ Contenu de main.tsx récupéré, analyse en cours...");
              if (text.includes("SyntaxError") || text.includes("Error")) {
                showVisibleError("Possible erreur de syntaxe dans main.tsx: " + text);
              }
            })
            .catch(err => {
              console.error("❌ Impossible de charger main.tsx:", err);
              showVisibleError("Impossible de charger main.tsx: " + err.message);
            });
        } catch (err) {
          console.error("❌ Erreur lors de la vérification des modules:", err);
        }
      }
    }, 2000);
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
  
  // On affiche les détails des scripts
  const loadedScripts = [];
  scripts.forEach((script, index) => {
    const src = script.src || 'inline script';
    const type = script.type || 'no type';
    console.log(`Script: ${src} (type: ${type})`);
    loadedScripts.push(src);
    
    // Vérifier la présence du script GPT Engineer
    if (src.includes('gptengineer.js')) {
      console.log('✅ Script Lovable (GPT Engineer) trouvé');
    }
    
    // Vérifier les scripts critiques
    if (src.includes('main.tsx') || src.includes('main.js')) {
      console.log(`✓ Script principal trouvé: ${src}`);
      
      // Tester le chargement du script
      const testScript = document.createElement('script');
      testScript.type = 'text/javascript';
      testScript.text = 'console.log("✅ Test de script JavaScript réussi");';
      document.head.appendChild(testScript);
    }
  });

  // Vérifier si le script Lovable est manquant
  if (!loadedScripts.some(src => src.includes('gptengineer.js'))) {
    console.error('❌ Script Lovable (GPT Engineer) manquant!');
    showVisibleError(`
      <h3>Script Lovable manquant</h3>
      <p>Le script GPT Engineer n'a pas été chargé. Les fonctionnalités Lovable ne seront pas disponibles.</p>
      <p>Assurez-vous que la balise suivante est présente dans votre index.html :</p>
      <pre>&lt;script src="https://cdn.gpteng.co/gptengineer.js" type="module"&gt;&lt;/script&gt;</pre>
    `);
  }
});

// Gestionnaire global des erreurs
window.onerror = function(message, source, lineno, colno, error) {
  console.error('🚨 Erreur globale détectée:', { message, source, lineno, colno, error });
  
  // Message d'erreur plus détaillé
  showVisibleError(`
    <h3>Erreur JavaScript détectée</h3>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Ligne:</strong> ${lineno}, <strong>Colonne:</strong> ${colno}</p>
    <p><strong>Détails:</strong> ${error ? error.stack || error.message : 'Non disponible'}</p>
    <hr/>
    <p>Pour résoudre ce problème:</p>
    <ul>
      <li>Vérifiez la syntaxe du code source indiqué</li>
      <li>Assurez-vous que les types MIME des fichiers sont correctement définis</li>
      <li>Essayez de vider le cache du navigateur</li>
    </ul>
    <button onclick="window.location.reload(true)" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Recharger la page
    </button>
    <button onclick="window.location.href='/fallback.html'" style="margin-left: 10px; padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Page de secours
    </button>
  `);
  
  // Journaliser l'erreur dans la console dans un format facilement lisible
  try {
    console.log("Erreur complète:", JSON.stringify({ message, source, lineno, colno, errorObj: error }, null, 2));
  } catch {}
  
  return false;
};

// Surveiller les erreurs de récupération
window.addEventListener('unhandledrejection', function(event) {
  console.error('🚨 Promise rejetée non gérée:', event.reason);
  showVisibleError(`
    <h3>Erreur asynchrone non gérée</h3>
    <p>${event.reason}</p>
    <button onclick="window.location.reload(true)" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Recharger la page
    </button>
  `);
});

// Ajouter une fonction d'aide pour vérifier si un module est chargé
window.checkModuleLoaded = function(moduleName) {
  try {
    if (window[moduleName]) {
      console.log(`✅ Module ${moduleName} est chargé`);
      return true;
    } else {
      console.warn(`⚠️ Module ${moduleName} n'est pas chargé`);
      return false;
    }
  } catch (e) {
    console.error(`❌ Erreur lors de la vérification du module ${moduleName}:`, e);
    return false;
  }
};

// Vérifier l'environnement React
setTimeout(() => {
  if (window.React) {
    console.log('✅ React est chargé, version:', window.React.version);
  } else {
    console.warn('⚠️ React n\'est pas détecté dans window');
  }
}, 2000);

console.log('🏁 Debug script fully initialized');
