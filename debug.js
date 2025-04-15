
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
          <hr/>
          <h3>Problèmes courants:</h3>
          <ul>
            <li>Types MIME incorrects (votre serveur envoie les fichiers .js/.ts comme "text/html")</li>
            <li>Script principal non chargé correctement</li>
            <li>Erreur de syntaxe JavaScript</li>
          </ul>
          <p>Essayez de rafraîchir votre cache ou d'accéder à la page de secours.</p>
          <button onclick="window.location.reload(true)" style="padding: 8px 16px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Recharger la page (forcer)
          </button>
          <button onclick="window.location.href='/fallback.html'" style="margin-left: 10px; padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Page de secours
          </button>
        `);

        // Tenter de diagnostiquer les problèmes MIME
        try {
          // Test manuel de chargement de script
          const scriptTest = document.createElement('script');
          scriptTest.type = 'text/javascript';
          scriptTest.text = 'console.log("✅ Test de script JavaScript direct réussi");';
          document.head.appendChild(scriptTest);
          
          // Test de chargement de module
          fetch('/src/main.tsx')
            .then(response => {
              console.log("Headers de réponse pour main.tsx:", response.headers);
              console.log("Type MIME reçu:", response.headers.get('content-type'));
              return response.text();
            })
            .then(text => {
              console.log("✓ Contenu récupéré, vérification en cours...");
              if (text.includes("<!DOCTYPE html>")) {
                showVisibleError(`
                  <h3>Problème de MIME Type détecté</h3>
                  <p>Le serveur renvoie du HTML au lieu de JavaScript pour les fichiers .tsx/.js</p>
                  <p>Vérifiez la configuration de votre serveur (.htaccess, mime.types)</p>
                `);
              }
            })
            .catch(err => {
              console.error("❌ Impossible de charger main.tsx:", err);
            });
        } catch (err) {
          console.error("❌ Erreur pendant les tests:", err);
        }
      }
    }, 2000);
  }
  
  // Vérification du localStorage
  try {
    localStorage.setItem('debug-test', 'test');
    localStorage.getItem('debug-test');
    localStorage.removeItem('debug-test');
    console.log('✅ localStorage fonctionne correctement');
  } catch (error) {
    console.error('❌ Erreur avec localStorage:', error);
  }
  
  // Vérification des scripts chargés
  const scripts = document.querySelectorAll('script');
  console.log(`✅ ${scripts.length} scripts sont chargés`);
  
  // On affiche les détails des scripts
  scripts.forEach((script) => {
    const src = script.src || 'inline script';
    const type = script.type || 'no type';
    console.log(`Script: ${src} (type: ${type})`);
    
    // Vérifier la présence du script GPT Engineer
    if (src.includes('gptengineer.js')) {
      console.log('✅ Script Lovable (GPT Engineer) trouvé');
    }
  });
});

// Gestionnaire d'erreurs pour problèmes de chargement de module
document.addEventListener('error', function(e) {
  const target = e.target;
  if (target.tagName === 'SCRIPT' && target.type === 'module') {
    console.error('📛 Erreur de chargement de module:', e);
    showVisibleError(`
      <h3>Erreur de chargement de module</h3>
      <p>Le script module "${target.src}" n'a pas pu être chargé.</p>
      <p>Cause probable: Type MIME incorrect. Le serveur doit envoyer application/javascript, mais envoie probablement text/html.</p>
      <button onclick="window.location.href='/fallback.html'" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Page de secours
      </button>
    `);
  }
}, true);

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
  `);
  
  return false;
};

// Surveiller les erreurs de récupération
window.addEventListener('unhandledrejection', function(event) {
  console.error('🚨 Promise rejetée non gérée:', event.reason);
  showVisibleError(`
    <h3>Erreur asynchrone non gérée</h3>
    <p>${event.reason}</p>
  `);
});

console.log('🏁 Debug script fully initialized');
